import React, { Component } from 'react';
import { View, Text } from 'react-native';
import style from '../Styles/PerfilSoda_Style';
import { Icon,Button } from 'react-native-elements';


class ModifySoda extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={style.container}>


        <Text style = {style.lblTittle}> Perfil Soda</Text>

        <Icon 
        raised
            name="trash" 
            type='ionicon'
            color='#f50'
            onPress={() => console.log('borrando')}
        />
        
        <Text>  </Text>

        <Button
          icon={{
          name: "arrow-right",
          size: 15,
          color: "white"
        }}
        title="Modificar"
        />
        
      </View>
    );
  }
}

export default ModifySoda;
