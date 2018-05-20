import React, {
    Component,
} from 'react';

import {
    ScrollView,
    Image,
    Text,
    View,
    ListView,
    TouchableOpacity,
    Platform,
    Alert,
    Dimensions
 } from 'react-native';

import {Actions,NavigationBar,Config,SSOAuth,Toast} from 'c2-mobile';

import {connect} from 'react-redux';

import {C2ABClient,C2ABOrganizationActions} from 'c2-mobile-contacts';

import styles from './MineStyles';

const ScreenWidth = Dimensions.get('window').width;

class ContactDetail extends Component{

     componentDidMount(){
         var userId = this.props.params.userId;
         this.props.dispatch(C2ABOrganizationActions.getAssignUserData(userId));
     }

//*********************************************************
//*************************EVENT***************************
//*********************************************************

     _logout(){
         SSOAuth.logout();
         Toast.show({title:'退出成功'});
         setTimeout(()=>{
             Toast.dismiss();
             Actions.ImessageLogin({type: 'reset'});
         },2000);
     }

//*********************************************************
//**************************UI*****************************
//*********************************************************

     _showRowView(title, content){
         return(
            <View style = {styles.infoRow}>
                <Text style = {styles.title}>{title}</Text>
                <Text style = {styles.content}>{content}</Text>
            </View>
         )
     }

     _showOrgContainer(orgs = []){
         var dom = [];
         orgs.forEach((item,key)=>{
             dom.push(
                 <View style = {[styles.infoRow,{marginLeft:16,borderColor:'#CECECE',borderBottomWidth:0.5}]}>
                     <Text style = {[styles.title,{paddingLeft:0}]}>机构</Text>
                     <Text style = {styles.content}>{item.name}</Text>
                </View>

             )
         })
         return dom;
     }

     _showSendMessageButton(){
         var userId = this.props.params.userId;
         return (
             <TouchableOpacity style = {[styles.buttonSendMessage,{backgroundColor:Config.C2IMessageDominantHue || "#4285f4"}]} onPress = {() => this._logout()}>
                <Text style = {styles.buttonText}>退出登录</Text>
            </TouchableOpacity>
        )
     }

     render() {
        var userId = this.props.params.userId;
        var userInfo = this.props.user.get(userId);
        if(!userInfo){
            userInfo = C2ABClient.user('common',{userId:userId})
        }

         return (
             <View style = {styles.container}>
                 <NavigationBar title="联系人详情" faction='center'>
                    <NavigationBar.NavBarItem faction='left' style={{width:80,paddingLeft:10}}/>
                    <NavigationBar.NavBarItem faction='right' style={{width:80,paddingRight:10}}/>
                </NavigationBar>
                <ScrollView>
                    <View style = {styles.container}>
                        <View style={styles.avatarContainer}>
                          <Image style={styles.avatar} source = {{uri:userInfo.avatar}} />
                        </View>
                        <View style={styles.infoContainer}>
                            {this._showRowView('姓名',userInfo.name)}
                        </View>
                        <View style={styles.infoContainer}>
                          {this._showOrgContainer(userInfo.organization)}
                          {this._showRowView('电话',userInfo.phone)}
                          <View style={styles.lineView}/>
                          {this._showRowView('邮箱',userInfo.email)}
                         </View>
                        {this._showSendMessageButton()}
                    </View>
                </ScrollView>
            </View>
         );
     }
 }

 // ------------ redux -------------
const mapStateToProps = (state) => {
    
    return {
      user:state.C2AddressBook.organization.get('user'),
    }
}

export default connect(mapStateToProps)(ContactDetail);