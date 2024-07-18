import React, {useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import { Image } from 'react-native';
import Customicon from '../components/Customicon';
const PaymentList = [
  {
    name: 'Pluxe',
    icon: require('../assets/image/pluxe.png'),
    isIcon: false,
  },
  {
    name: 'Google Pay',
    icon: require('../assets/image/gpay.png'),
    isIcon: false,
  },
  {
    name: 'Apple Pay',
    icon: require('../assets/image/applepay.png'),
    isIcon: false,
  },
 
];

const PaymentScreen = ({navigation, route}: any) => {
 

  const [paymentMode, setPaymentMode] = useState('Credit Card');
  const [showAnimation, setShowAnimation] = useState(false);
  const [showBuyButton, setShowBuyButton] = useState(false);
  const {seatArray, date: selectedDate, time: selectedTime, ticketImage} = route.params || {};


  const buttonPressHandler = () => {
    setShowAnimation(true);
    
  };
  const handlePaymentSelection = (mode: any) => {
    setPaymentMode(mode);
    setShowBuyButton(true); 
  };

  const handleBuyTickets = async () => {
    if (seatArray && selectedDate && selectedTime && ticketImage) {
      try {
        await EncryptedStorage.setItem(
          'ticket',
          JSON.stringify({
            seatArray: seatArray,
            time: selectedTime,
            date: selectedDate,
            ticketImage: ticketImage,
          }),
        );
      
        navigation.navigate('Ticket', {
          seatArray: seatArray,
          time: selectedTime,
          date: selectedDate,
          ticketImage: ticketImage,
        });
        
      } catch (error) {
        console.error('Error while storing ticket details', error);
      }
    } else {
      console.error('Missing data for booking the ticket');
    }
  };
  
  

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.Black} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View style={styles.HeaderContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
          
            }}>
           
          </TouchableOpacity>
          
          <Text style={styles.HeaderText}>Payments</Text>
          <View style={styles.EmptyView} />
        </View>


        <View style={styles.PaymentOptionsContainer}>
          <TouchableOpacity
            onPress={() => {
              setPaymentMode('Credit Card');
            }}>
            <View
              style={[
                styles.CreditCardContainer,
                {
                  borderColor:
                    paymentMode == 'Credit Card'
                      ? COLORS.OrangeRGBA0
                      : COLORS.Grey,
                },
              ]}>
              <Text style={styles.CreditCardTitle}>Credit Card</Text>
              <View style={styles.CreditCardBG}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.LinearGradientStyle}
                  colors={[COLORS.Grey, COLORS.Black]}>
                  <View style={styles.CreditCardRow}>
                    <Customicon
                      name="chip"
                      size={FONTSIZE.size_20 * 2}
                      color={COLORS.OrangeRGBA0}
                    />
                  <Text style={styles.HeaderText}>Visa</Text>
                  </View>
                  <View style={styles.CreditCardNumberContainer}>
                    <Text style={styles.CreditCardNumber}>3879</Text>
                    <Text style={styles.CreditCardNumber}>8923</Text>
                    <Text style={styles.CreditCardNumber}>6745</Text>
                    <Text style={styles.CreditCardNumber}>4638</Text>
                  </View>
                  <View style={styles.CreditCardRow}>
                    <View style={styles.CreditCardNameContainer}>
                      <Text style={styles.CreditCardNameSubitle}>
                        Card Holder Name
                      </Text>
                      <Text style={styles.CreditCardNameTitle}>
                        Sandru Ana-Maria
                      </Text>
                    </View>
                    <View style={styles.CreditCardDateContainer}>
                      <Text style={styles.CreditCardNameSubitle}>
                        Expiry Date
                      </Text>
                      <Text style={styles.CreditCardNameTitle}>02/30</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </TouchableOpacity>
          
          {PaymentList.map((data: any) => (
    <TouchableOpacity
    key={data.name}
    onPress={() => handlePaymentSelection(data.name)}>
    <View
      style={[
        styles.PaymentOptionContainer,
        {
          borderColor:
            paymentMode == data.name ? COLORS.OrangeRGBA0 : COLORS.Grey,
        },
      ]}>
      {!data.isIcon ? (
        <Image
          source={data.icon}
          style={styles.PaymentOptionImage}
          resizeMode="contain"
        />
      ) : (
        <Customicon
          name={data.icon}
          size={FONTSIZE.size_20 * 2}
          color={
            paymentMode == data.name ? COLORS.OrangeRGBA0 : COLORS.WhiteRGBA32
          }
        />
      )}
      <Text
        style={[
          styles.PaymentOptionText,
          {
            color:
              paymentMode == data.name ? COLORS.Orange : COLORS.WhiteRGBA32,
          },
        ]}>
        {data.name}
      </Text>
    </View>
  </TouchableOpacity>
))}

        </View>
        {paymentMode && showBuyButton && (
          <TouchableOpacity style={styles.buyButton} onPress={handleBuyTickets}>
            <Text style={styles.buyButtonText}>Buy</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      
    </View>
  );
};

const styles = StyleSheet.create({
  buyButton: {
    paddingVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_20,
    backgroundColor: COLORS.Orange,
    borderRadius: BORDERRADIUS.radius_15,
    alignItems: 'center',
    marginVertical: SPACING.space_15,
  },
  buyButtonText: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
  },
  
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  LottieAnimation: {
    flex: 1,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  HeaderContainer: {
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.WhiteRGBA32,
  },
  EmptyView: {
    height: SPACING.space_36,
    width: SPACING.space_36,
  },
  PaymentOptionsContainer: {
    padding: SPACING.space_15,
    gap: SPACING.space_15,
  },
  CreditCardContainer: {
    padding: SPACING.space_10,
    gap: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_15 * 2,
    borderWidth: 3,
  },
  CreditCardTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.WhiteRGBA32,
    marginLeft: SPACING.space_10,
  },
  CreditCardBG: {
    backgroundColor: COLORS.Grey,
    borderRadius: BORDERRADIUS.radius_25,
  },
  LinearGradientStyle: {
    borderRadius: BORDERRADIUS.radius_25,
    gap: SPACING.space_36,
    paddingHorizontal: SPACING.space_15,
    paddingVertical: SPACING.space_10,
  },
  CreditCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  CreditCardNumberContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  CreditCardNumber: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.WhiteRGBA32,
    letterSpacing: SPACING.space_4 + SPACING.space_2,
  },
  CreditCardNameSubitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.Grey,
  },
  CreditCardNameTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.WhiteRGBA15,
  },
  CreditCardNameContainer: {
    alignItems: 'flex-start',
  },
  CreditCardDateContainer: {
    alignItems: 'flex-end',
  },
  PaymentOptionText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    marginLeft: SPACING.space_10,
  }, PaymentOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_15 * 2,
    borderWidth: 3,
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.space_10,
    borderColor: COLORS.Grey,
  },
  PaymentOptionImage: {
    width: 40,
    height: 40,
    borderRadius:BORDERRADIUS.radius_15
  },
  
  radioIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
  },
});

export default PaymentScreen;