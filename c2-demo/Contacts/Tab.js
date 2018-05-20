'use strict'

import {View} from 'react-native';
import React,{Component} from 'react';
import {TabBar,VectorIcons,UserInfo,UUID,Config} from 'c2-mobile';
import {connect} from 'react-redux';

import {
  C2ABClient,
  C2ABSelectContacts,
  C2ABOrganizationActions
} from 'c2-mobile-contacts';

class SelectContacts extends Component{

      componentDidMount(){

        var contactsParams = {
          apiHost:"http://cp.dev.c2cloud.cn",
          userId:UserInfo.id,
          username:UserInfo.id,
        }
      
      var props = this.props;
      //通讯录
      C2ABClient.initService(contactsParams);
      props.dispatch(C2ABOrganizationActions.initOrganization());
    }

    render(){
        return(
            <C2ABSelectContacts/>
        )
    }
}

// ------------ redux -------------
const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(SelectContacts);
