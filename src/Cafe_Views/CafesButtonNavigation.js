import React, { useState } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
// Windows
import Orders from './Orders'
import Menu from './Menu'
import ModifySoda from '../Views/ModifySoda'
import BottomNavigation, {
    FullTab
} from 'react-native-material-bottom-navigation'


export default function CafesButtonNavigation(props) {

    const cafe_username = props.route.params.cafe_username;
    const [active_tab, setActiveTab] = useState('orders_tab');

    const tabs = [
        {
            key: 'orders_tab',
            icon: 'list',
            icon_type: 'feather',
            label: 'Pedidos',
            barColor: 'black',
            screen: <Orders cafe_username={cafe_username} />,
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: 'menus_tab',
            icon: 'restaurant-menu',
            icon_type: 'material-icons',
            label: 'Menus',
            barColor: 'black',
            screen: <Menu cafe_username={cafe_username} navigation={props.route.params.navigation} />,
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: 'modify_tab',
            icon: 'edit',
            icon_type: 'material-icons',
            label: 'Editar',
            barColor: 'black',
            screen: <ModifySoda cafe_username={cafe_username} />,
            pressColor: 'rgba(255, 255, 255, 0.16)'
        }
    ]

    const renderIcon = (icon, icon_type) => ({ isActive }) => (
        <Icon size={20} color="snow" name={icon} type={icon_type} />
    )

    const renderTab = ({ tab, isActive }) => (
        <FullTab
            isActive={isActive}
            key={tab.key}
            label={tab.label}
            renderIcon={renderIcon(tab.icon, tab.icon_type)}
        />
    )

    const renderScreen = () => {
        return active_tab == 'orders_tab' && tabs[0].screen ||
            active_tab == 'menus_tab' && tabs[1].screen ||
            tabs[2].screen
    }

    return <>
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                {renderScreen()}
            </View>
            <BottomNavigation
                activeTab={active_tab}
                onTabPress={newTab => setActiveTab(newTab.key)}
                renderTab={renderTab}
                tabs={tabs}
            />
        </View>
    </>
}