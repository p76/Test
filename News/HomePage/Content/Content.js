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
import css from './ContentCss';
import { DropMenu, NavigationBar, Toast, SegmentedControl, TabBar, VectorIcon } from 'c2-mobile';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const data = [{ key: '推荐' }, { key: '热点' }, { key: '视频' }, { key: '新时代' }, { key: '小视频' }, { key: '图片' }, { key: '问答' }, { key: '娱乐' }, { key: '科技' }, { key: '懂车帝' }, { key: '财经' }, { key: '体育' }]
const cellDataScource = ['PGONE遭封杀 ', '20岁小伙中28亿大奖', '茅台市值超LV', '春节将至，回家的票抢到了吗？', 'PGONE遭封杀 ', '20岁小伙中28亿大奖', '茅台市值超LV', '春节将至，回家的票抢到了吗？', 'PGONE遭封杀 ', '20岁小伙中28亿大奖', '茅台市值超LV', '春节将至，回家的票抢到了吗？']

export default class Content extends Component {

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
            <TouchableOpacity style={{alignItems:'center'}}>
                <View style={{width:width-30,height:height/10,backgroundColor:'white',borderRadius:5,marginTop:5}}>
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
                <View style={css.main}>
                    <Text style={css.today}>今日头条</Text>
                    <View style={css.modul}>
                        <VectorIcon name={'search'} size={20} />
                        <TextInput
                            placeholder={'搜索'}
                            underlineColorAndroid='transparent'
                            style={css.textinput}
                            onChangeText={this._onChangeText}
                            returnKeyType={'search'}
                        />
                    </View>
                </View>
                <View style={{ padding: 10,backgroundColor:'white'}}>
                    <FlatList
                        data={data}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={() => this._show()}>
                                <Text style={css.flatlist}>{item.key}</Text>
                            </TouchableOpacity>}
                        horizontal={true}
                    />
                </View>
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