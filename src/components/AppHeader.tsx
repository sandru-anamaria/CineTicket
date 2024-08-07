import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONTSIZE, FONTFAMILY, BORDERRADIUS } from '../theme/theme';
import Customicon from './Customicon';

const AppHeader = (props: any) => {
  return (
    <View style={styles.container}>
      
      <Text style={styles.headerText}>{props.header}</Text>
      <View style={styles.emptyContainer}></View>
      <TouchableOpacity style={styles.iconBG} onPress={() => props.action()}>
        <Customicon name={props.name} style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      iconStyle: {
        color: COLORS.White,
        fontSize: FONTSIZE.size_24,
      },
      headerText: {
        flex: 1,
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_20,
        textAlign: 'center',
        color: COLORS.White,
      },
      emptyContainer: {
        height: SPACING.space_20 * 2,
        width: SPACING.space_20 * 2,
      },
      iconBG: {
        height: SPACING.space_20 * 2,
        width: SPACING.space_20 * 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: BORDERRADIUS.radius_20,
        backgroundColor: COLORS.Orange,
      },
});

export default AppHeader;