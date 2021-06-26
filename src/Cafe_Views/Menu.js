import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar, ActivityIndicator, Button, CheckBox } from 'react-native';
import { Icon } from 'react-native-elements';
import { getOrders, changeOrderState } from './Cafe_Consults';

export default function Menu(props) {

    const [cafe, setCafe] = useState('usuariocafe2');
    const [isLoading, setLoading] = useState(true);

    console.log(props.route.params)

    return <>
        <Text style={{ paddingTop: StatusBar.currentHeight }}>Hello</Text>
    </>;
}


const styles = StyleSheet.create({

});
