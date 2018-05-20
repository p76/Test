import{
    Dimensions,
} from 'react-native';

const ScreenWidth = Dimensions.get('window').width;

module.exports = {
     container: {
         flex: 1,
         backgroundColor:'#f6f6f6'
     },
     avatarContainer: {
         paddingTop:14,
         alignSelf:'center',
     },
     avatar:{
         width: 80,
         height: 80,
         borderRadius: 40,
     },
     infoContainer:{
         marginTop:20,
         backgroundColor:'white',
         borderColor:'#cecece',
         borderWidth:0.5,
     },
     infoRow:{
         flex: 1,
         flexDirection: 'row',
         paddingTop:10,
         paddingBottom:10,
     },
     title: {
         flex:1,
         fontSize: 17,
         fontWeight:'bold',
         textAlign: 'left',
         color:'#0A0A0A',
         paddingLeft:16, 
         
     },
     content:{
         fontSize: 17,
         color:'#969696',
         paddingRight:16
     },
     buttonSendMessage:{
         marginTop:20,
         marginLeft:60,
         marginRight:60,
         height:44,
         borderRadius:5,
         alignItems:'center',
         justifyContent:'center',
     },
     buttonText:{
        color:'white',
        fontSize:17,
     },
     lineView:{
         flex:1,
         height:0.5,
         marginLeft:16,
         backgroundColor:'#CECECE'
     }
};