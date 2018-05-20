'use strict'

import {View} from 'react-native';
import React,{Component} from 'react';
import {TabBar,VectorIcons,UserInfo,UUID,Config,Actions} from 'c2-mobile';
import {connect} from 'react-redux';

import {
  C2IMClient,
  C2IMChatList,
  C2IMContacts,
  C2IMMessageActions,
  C2IMSessionActions,
  C2IMContactsActions,
  C2IMServerActions,
} from 'c2-mobile-imessage';

import {
  C2ABClient,
  C2ABUserActions,
  C2ABContactsIndex,
  C2ABOrganizationActions
} from 'c2-mobile-contacts';

import Mine from './Mine';

import C2Push from 'c2-mobile-push';

class IMessageDemo extends Component{

      componentDidMount(){

        C2Push.initPush()
        .then((response)=>{
          C2IMClient.api.registerDevice()
          .then((result)=>{

          })
          .catch((e)=>{
            
          })
        })
        .catch((e)=>{

        });
        
        C2Push.getOpenNotificationExtras()
        .then((result)=>{
          console.log(result);
        })
        .catch((e)=>{
          console.log('空的');
        })

        Actions.ImessageDemo({type:'reset'});
        var contactsParams = {
          apiHost:"http://api.test.c2cloud.cn",
          userId:UserInfo.id,
          username:UserInfo.id,
        }
        // http://172.16.33.45:8085
        var imparams = {
          apiHost:"http://api.test.c2cloud.cn",
          mqttHost:"172.17.32.102",
          mqttPort:'32180',
          userId:UserInfo.id,
          username:UserInfo.id,
          password:UserInfo.id,
          clientId:UUID.v4()
        }
      
      var props = this.props;
      //通讯录
      C2ABClient.initService(contactsParams);
      props.dispatch(C2ABOrganizationActions.initOrganization());
      //IM
      C2IMClient.initService(imparams);
      C2IMClient.conn.listen({
        onOpened:()=>{
          props.dispatch(C2IMSessionActions.getChatsList());
          props.dispatch(C2IMServerActions.connectSuccess());
        },
        onClosed:()=>{
          props.dispatch(C2IMServerActions.connectClosed());
        },
        onTextMessage:(message)=>{
          props.dispatch(C2IMSessionActions.delayUpdateSort(message));
        },
        onPictureMessage:(message)=>{
          props.dispatch(C2IMSessionActions.delayUpdateSort(message));
        },
        onLiveMessage:(message)=>{
          props.dispatch(C2IMSessionActions.delayUpdateSort(message));
        },
        onFileMessage:(message)=>{
          props.dispatch(C2IMSessionActions.delayUpdateSort(message));
        },
        onAlreadMessage:(message)=>{
          props.dispatch(C2IMSessionActions.clearUnread(message.sessionId));
        }
      })
      props.dispatch(C2IMContactsActions.updateRecentContacts());
      props.dispatch(C2IMServerActions.connect());
    }

    render(){
        return(
            <View style={{ flex: 1 }}>
              <TabBar badgeStyle={{backgroundColor:'#EE3E5F'}} textColorSelected="#4285f4" textColor="gray" height={50}>
                <TabBar.Item
                icon="c2_im_message_circle"
                selectedIcon="c2_im_message_circle"
                iconSize={22}
                textSize={10}
                title="消息"
                >
                  <C2IMChatList {...this.props} />
                </TabBar.Item>
                <TabBar.Item
                icon="c2_im_person_long"
                selectedIcon="c2_im_person_long"
                iconSize={22}
                textSize={10}
                title="通讯录"
                >
                  <C2IMContacts {...this.props} />
                </TabBar.Item>
                <TabBar.Item
                icon="account_balance"
                selectedIcon="account_balance"
                iconSize={22}
                textSize={10}
                title="我的"
                >
                  <Mine {...this.props} params={{userId:UserInfo.id}} />
                </TabBar.Item>
              </TabBar>
            </View>
        )
    }
}

// ------------ redux -------------
const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(IMessageDemo);
