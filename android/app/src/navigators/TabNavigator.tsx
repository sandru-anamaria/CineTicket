import React from "react";
import HomeScreen from "../../../../src/screens/HomeScreen";
import SearchScreen from "../../../../src/screens/SearchScreen";
import MovieDetailsScreen from "../../../../src/screens/MovieDetailsScreen";
import TicketScreen from "../../../../src/screens/TicketScreen";
import PaymentScreen from "../../../../src/screens/PaymentScreen";
import { COLORS, FONTSIZE, SPACING } from "../../../../src/theme/theme";
import Customicon from "../../../../src/components/Customicon";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
        screenOptions={{
            tabBarHideOnKeyboard: true,
            headerShown: false,
            tabBarStyle: {
                backgroundColor: COLORS.Black,
                borderTopWidth: 0,
                height: SPACING.space_10 * 10,
            }
        }}>
        <Tab.Screen name="Home" component={HomeScreen} options ={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused, color, size}) =>{
                return <View  style={[
                    styles.activeTabBackground,
                    focused ? {backgroundColor: COLORS.Orange} : {},
                  ]}>
                    <Customicon name='video' color={COLORS.White} size={FONTSIZE.size_27}></Customicon>
                </View>
            }
        }} />
        <Tab.Screen name="Search" component={SearchScreen} options ={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused, color, size}) =>{
                return <View  style={[
                    styles.activeTabBackground,
                    focused ? {backgroundColor: COLORS.Orange} : {},
                  ]}>
                    <Customicon name='search' color={COLORS.White} size={FONTSIZE.size_27}></Customicon>
                </View>
            }
        }} />
        <Tab.Screen name="Ticket" component={TicketScreen} options ={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused, color, size}) =>{
                return <View  style={[
                    styles.activeTabBackground,
                    focused ? {backgroundColor: COLORS.Orange} : {},
                  ]}>
                    <Customicon name='ticket' color={COLORS.White} size={FONTSIZE.size_27}></Customicon>
                </View>
            }
        }} />
        <Tab.Screen name="Payment" component={PaymentScreen} options ={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused, color, size}) =>{
                return <View  style={[
                    styles.activeTabBackground,
                    focused ? {backgroundColor: COLORS.Orange} : {},
                  ]}>
                    <Customicon name='dollar' color={COLORS.White} size={FONTSIZE.size_27}></Customicon>
                </View>
            }
        }} />
      </Tab.Navigator>
    )

};
const styles =StyleSheet.create({
    activeTabBackground:{
        backgroundColor:COLORS.Black,
        padding:SPACING.space_14,
        borderRadius: SPACING.space_18 *10,
    }
});

export default TabNavigator;