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
    TextInput
} from 'react-native';
import React, { Component } from 'react';
import css from './HeadlinesCss';
import { DropMenu, NavigationBar, Toast, SegmentedControl, TabBar, VectorIcon,Actions } from 'c2-mobile';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const cellDataScource = ['PGONE遭封杀 ', '20岁小伙中28亿大奖', '茅台市值超LV', '春节将至，回家的票抢到了吗？', 'PGONE遭封杀 ', '20岁小伙中28亿大奖', '茅台市值超LV', '春节将至，回家的票抢到了吗？', 'PGONE遭封杀 ', '20岁小伙中28亿大奖', '茅台市值超LV', '春节将至，回家的票抢到了吗？']

export default class Headlines extends Component {

    constructor(props) {
        super(props);
        this._refresh = this._refresh.bind(this);
        this._renderRow = this._renderRow.bind(this);
        this._getData = this._getData.bind(this);
        this._show = this._show.bind(this);
        this._onChangeText = this._onChangeText.bind(this);



        this.state = {
            page: 1,
            type: 0,
            isRefreshing: false,
            isShowFooter: false,
            MoreData: true,
            dataSource: this._getData(cellDataScource),
            resultRows: [],
            channelId: '571',
            status: false,
            textValue: '',
        }
    }

    // componentWillMount() {
    //     this._getData(cellDataScource);

    // }



    _refresh() {

    }

    _renderRow(rowData: any, sectionID: string, rowID: string) {
        return (
            <TouchableOpacity style={{ alignItems: 'center' }}>
                <View style={{ width: width - 30, height: height / 10, backgroundColor: 'white', borderRadius: 5, marginTop: 5 }}>
                    <Text  >{rowData}</Text>
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
        return (
            <View style={css.standard}>
                <NavigationBar title="微头条" faction='center'>
                    <NavigationBar.NavBarItem
                        faction='left'
                        style={{ paddingLeft: 10 }}
                        leftIcon={'person_add'}
                        iconSize={20}
                        onPress={()=>Actions.pop()}
                    />
                    <NavigationBar.NavBarItem 
                    faction='right' 
                    style={{ width: 80, paddingRight: 10 }}
                    rightIcon={'photo_camera'} 
                    iconSize={20}/>
                </NavigationBar>

                <ListView style={css.standard}
                    ref={'listView'}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    onEndReachedThreshold={Platform.OS == 'ios' ? -30 : 5}
                />
                {this.state.status ? <View>
                    <Text>nfkjsdfh </Text>
                </View> : <View></View>}

            </View>
        )
    }
}