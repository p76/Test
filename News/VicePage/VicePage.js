'use strict'

import {
    View,
    ScrollView,
    TouchableOpacity,
    Text,
    Platform,
    Navigator,
    RefreshControl,
    ListView,
    FlatList,
    Dimensions,
    TextInput,
    Image,
    DrawerLayoutAndroid,
} from 'react-native';
import React, { Component } from 'react';
import css from './HomePageCss';
import List from './List';
import { DropMenu, NavigationBar, Toast, SegmentedControl, TabBar, VectorIcon, Fetch, ViewPager } from 'c2-mobile';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
var arr = [];
export default class VicePage extends Component {

    constructor(props) {
        super(props);
        this._getDataSource = this._getDataSource.bind(this);
        this._renderRow = this._renderRow.bind(this);
        this._getData = this._getData.bind(this);
        this._show = this._show.bind(this);
        this._onChangeText = this._onChangeText.bind(this);

        this.state = {
            dataSource: this._getData([]),
            content: [],
        }
    }

    componentWillMount() {
        this._getDataSource();
    }
    _getDataSource() {
        var url = "http://news-at.zhihu.com/api/4/theme/"+this.props.id;
        return Fetch.getJson(url, {})
            .then((response) => {
                this.setState({
                    dataSource: this._getData(response.stories),
                    content: response.stories
                })
                // console.warn(JSON.stringify(this.state.content[0]))
            }).catch((error) => {
                console.warn(JSON.stringify(error));
            });
    }

    _renderRow(rowData: any, sectionID: string, rowID: string) {
        return (
            <TouchableOpacity style={{ alignItems: 'center' }}>
                <View style={{ width: width, height: height / 8, backgroundColor: 'white', borderRadius: 5, marginTop: 1, flexDirection: 'row' }}>
                    <Text style={{ color: 'black', flexWrap: 'wrap', width: width / 1.3, marginTop: 10, marginLeft: 10, fontSize: 15 }}>{rowData.title}</Text>
                    <Image source={{ uri: rowData.images[0] }} style={{ width: 60, height: 60, margin: 5 }} />
                </View>
            </TouchableOpacity>
        )
    }
    _getData(data) {
        var sectionID = [];
        var rowID = [];
        var getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[sectionID][rowID];
        };
        let dataSource = new ListView.DataSource({
            getRowData: getRowData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });
        return dataSource.cloneWithRows(data)
    }
    _show() {
        this.setState({
            status: !this.state.status,
        })
    }
    _onChangeText(text) {
        this.setState({
            textValue: text,
        })
    }

    render() {
        var navigationView = (
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: 'rgb(30,144,255)' }}>
                    <Image source={require('./timg.jpg')} style={{ width: 30, height: 30, borderRadius: 15, marginLeft: 10 }} />
                    <Text style={{ color: 'white', marginLeft: 5, marginTop: 5 }}>请登陆</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', backgroundColor: 'rgb(30,144,255)', paddingTop: 10 }}>
                    <TouchableOpacity style={{flexDirection:'row'}}>
                        <VectorIcon name={'star2'} size={15} color={'white'} style={{ marginHorizontal: 10, marginVertical: 10 }} />
                        <Text style={{ color: 'white', marginTop: 8 }}>我的收藏</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection:'row'}}>
                        <VectorIcon name={'download'} size={15} color={'white'} style={{ marginRight: 10, marginVertical: 10, marginLeft: 20 }} />
                        <Text style={{ color: 'white', marginTop: 8 }}>离线下载</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: 'rgb(220,220,220)',flexDirection:'row',padding:10 }}>
                    <VectorIcon name={'home2'} size={20} color={'rgb(30,144,255)'} />
                    <Text style={{ color: 'rgb(30,144,255)', marginLeft: 15 }}>首页</Text>
                </View>
                <List />
            </View>
        );
        return (
            <View style={css.standard}>
                <NavigationBar title={this.props.name} faction='center' style={{ backgroundColor: 'rgb(30,144,255)' }}>
                    <NavigationBar.NavBarItem faction='left' leftIcon={'clear_all'} iconSize={25} style={{ width: 80, paddingLeft: 10 }} />
                    <NavigationBar.NavBarItem faction='right' style={{ width: 80, paddingRight: 10 }} />
                </NavigationBar>
                <DrawerLayoutAndroid
                    drawerWidth={200}
                    drawerPosition={DrawerLayoutAndroid.positions.left}
                    renderNavigationView={() => navigationView}>
                    <ViewPager showsPagination={true} height={200} >
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {/* <Image style={{ height: 200, width: width}} resizeMode={'stretch'} source={{ uri: this.state.content[1].images[0] }} /> */}
                            <TouchableOpacity style={{ position: 'absolute', height: 200, width: width }}>
                                {/* <Text style={{ color: 'white', marginTop: 130, fontSize: 20 }}>{this.state.content[1].title}</Text> */}
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {/* <Image style={{ height: 200, width: width }} source={{ uri: this.state.content[10].images[0] }} /> */}
                            <TouchableOpacity style={{ position: 'absolute', height: 200, width: width }}>
                                {/* <Text style={{ color: 'white', marginTop: 130, fontSize: 20 }}>{this.state.content[10].title}</Text> */}
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {/* <Image style={{ height: 200, width: width }} source={{ uri: this.state.content[8].images[0] }} /> */}
                            <TouchableOpacity style={{ position: 'absolute', height: 200, width: width }}>
                                {/* <Text style={{ color: 'white', marginTop: 130, fontSize: 20 }}>{this.state.content[8].title}</Text> */}
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {/* <Image style={{ height: 200, width: width }} source={{ uri: this.state.content[7].images[0] }} /> */}
                            <TouchableOpacity style={{ position: 'absolute', height: 200, width: width }}>
                                {/* <Text style={{ color: 'white', marginTop: 130, fontSize: 20 }}>{this.state.content[7].title}</Text> */}
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {/* <Image style={{ height: 200, width: width }} source={{ uri: this.state.content[4].images[0] }} /> */}
                            <TouchableOpacity style={{ position: 'absolute', height: 200, width: width }}>
                                {/* <Text style={{ color: 'white', marginTop: 130, fontSize: 20 }}>{this.state.content[4].title}</Text> */}
                            </TouchableOpacity>
                        </View>
                    </ViewPager>
                    <ListView style={css.standard}
                        ref={'listView'}
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow}
                        // renderHeader={this._renderHeader}
                        onEndReachedThreshold={Platform.OS == 'ios' ? -30 : 5}
                    />
                </DrawerLayoutAndroid>

            </View >
        )
    }
}