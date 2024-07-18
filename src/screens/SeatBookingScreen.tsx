import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, StatusBar, ImageBackground, TouchableOpacity, FlatList, ToastAndroid } from 'react-native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import AppHeader from '../components/AppHeader';
import Customicon from '../components/Customicon';
import EncryptedStorage from 'react-native-encrypted-storage';

const timeArray: string[] = [
  '10:30',
  '12:30',
  '14:30',
  '15:00',
  '19:30',
  '21:00',
];

const generateDate = () => {
  const date = new Date();
  let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let weekdays = [];
  for (let i = 0; i < 7; i++) {
    let tempDate = {
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
      day: weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
    };
    weekdays.push(tempDate);
  }
  return weekdays;
};

type Seat = {
  number: number;
  taken: boolean;
  selected: boolean;
};

const generateSeats = (): Seat[][] => {
  const rows = [
    [1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 30],
    [31, 32, 33, 34, 35, 36, 37, 38]
  ];
  return rows.map(row => row.map(seatNumber => ({
    number: seatNumber,
    taken: Boolean(Math.round(Math.random())),
    selected: false,
  })));
};

const SeatBookingScreen = ({ navigation, route }: any) => {
  const [dataArray, setDataArray] = useState(generateDate());
  const [selectedDataIndex, setSelectedDataIndex] = useState<number | null>(null);
  const [price, setPrice] = useState<number>(0);

  const [seatArray, setSeatArray] = useState<Seat[][]>(generateSeats());
  const [selectedSeatArray, setSelectedSeatArray] = useState<number[]>([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<number | null>(null);

  const selectSeat = (rowIndex: number, seatIndex: number) => {
    let temp = [...seatArray];
    let selectedSeat = temp[rowIndex][seatIndex];
    if (!selectedSeat.taken) {
      selectedSeat.selected = !selectedSeat.selected;
      let newSelectedSeats = selectedSeat.selected
        ? [...selectedSeatArray, selectedSeat.number]
        : selectedSeatArray.filter(number => number !== selectedSeat.number);
      setSelectedSeatArray(newSelectedSeats);
      setPrice(newSelectedSeats.length * 5.0);
      setSeatArray(temp);
    }
  };



  const BookSeats = async () => {
    if (
      selectedSeatArray.length !== 0 &&
      selectedTimeIndex !== null &&
      selectedDataIndex !== null &&
      dataArray[selectedDataIndex] !== undefined
    ) {
      try {
        await EncryptedStorage.setItem(
          'ticket',
          JSON.stringify({
            seatArray: selectedSeatArray,
            time: timeArray[selectedTimeIndex],
            date: dataArray[selectedDataIndex],
            ticketImage: route.params.PosterImage,
          }),
        );
      } catch (error) {
        console.error(
          'Something went Wrong while storing in BookSeats Functions',
          error,
        );
      }
      navigation.navigate('Payment', {
        seatArray: selectedSeatArray,
        time: timeArray[selectedTimeIndex],
        date: dataArray[selectedDataIndex],
        ticketImage: route.params.PosterImage,
      });
    } else {
      ToastAndroid.showWithGravity(
        'Please Select Seats, Date and Time of the Show',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <StatusBar hidden />
      <View>
        <ImageBackground
          source={{ uri: route.params?.BgImage }}
          style={styles.ImageBG}>
          <LinearGradient
            colors={[COLORS.BlackRGB10, COLORS.Black]}
            style={styles.linearGradient}>
            <View style={styles.appHeaderContainer}>
              <AppHeader
                name="close"
                header={''}
                action={() => navigation.goBack()}
              />
            </View>
          </LinearGradient>
        </ImageBackground>
        <Text style={styles.screenText}>Screen this side</Text>
      </View>

      <View style={styles.seatContainer}>
        {seatArray.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.seatRow}>
            {row.map((seat, seatIndex) => (
              <TouchableOpacity
                key={seat.number}
                onPress={() => selectSeat(rowIndex, seatIndex)}>
                <Customicon
                  name="seat"
                  style={[
                    styles.seatIcon,
                    seat.taken ? { color: COLORS.Grey } : {},
                    seat.selected ? { color: COLORS.Orange } : {},
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
        ))}
        <View style={styles.seatRadioContainer}>
          <View style={styles.radioContainer}>
            <Customicon name="radio" style={styles.radioIcon}></Customicon>
            <Text style={styles.radioText}>Available</Text>
          </View>
          <View style={styles.radioContainer}>
            <Customicon name="radio" style={[styles.radioIcon, { color: COLORS.Grey }]}></Customicon>
            <Text style={styles.radioText}>Taken</Text>
          </View>
          <View style={styles.radioContainer}>
            <Customicon name="radio" style={[styles.radioIcon, { color: COLORS.Orange }]}></Customicon>
            <Text style={styles.radioText}>Selected</Text>
          </View>
        </View>
      </View>

      <View>
        <FlatList
          data={dataArray}
          keyExtractor={item => item.date.toString()}
          horizontal
          bounces={false}
          contentContainerStyle={styles.containerGap24}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => setSelectedDataIndex(index)}>
                <View
                  style={[
                    styles.dateContainer,
                    index === 0
                      ? { marginLeft: SPACING.space_24 }
                      : index === dataArray.length - 1
                        ? { marginRight: SPACING.space_24 }
                        : {},
                    index === selectedDataIndex
                      ? { backgroundColor: COLORS.Orange }
                      : {},
                  ]}>
                  <Text style={styles.dateText}>{item.date}</Text>
                  <Text style={styles.dayText}>{item.day}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <View style={styles.OutterContainer}>
        <FlatList
          data={timeArray}
          keyExtractor={item => item}
          horizontal
          bounces={false}
          contentContainerStyle={styles.containerGap24}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => setSelectedTimeIndex(index)}>
                <View
                  style={[
                    styles.timeContainer,
                    index === 0
                      ? { marginLeft: SPACING.space_24 }
                      : index === dataArray.length - 1
                        ? { marginRight: SPACING.space_24 }
                        : {},
                    index === selectedTimeIndex
                      ? { backgroundColor: COLORS.Orange }
                      : {},
                  ]}>
                  <Text style={styles.timeText}>{item}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <View style={styles.buttonPriceContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.totalPriceText}>Total Price</Text>
          <Text style={styles.price}>RON {price}.00</Text>
        </View>
        <TouchableOpacity onPress={BookSeats}>
          <Text style={styles.buttonText}>Buy Tickets</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  ImageBG: {
    width: '100%',
    height: SPACING.space_10 * 24,
  },
  linearGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_24,
    marginVertical: SPACING.space_10 * 2,
  },
  screenText: {
    textAlign: 'center',
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.WhiteRGBA15,
  },
  seatContainer: {
    marginVertical: SPACING.space_20,
  },
  seatRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: SPACING.space_10,
  },
  seatIcon: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    marginHorizontal: SPACING.space_10,
  },
  seatRadioContainer: {
    flexDirection: 'row',
    marginTop: SPACING.space_36,
    marginBottom: SPACING.space_10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  radioContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  radioIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
  },
  radioText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
  containerGap24: {
    gap: SPACING.space_24,
  },
  dateContainer: {
    width: SPACING.space_10 * 5,
    height: SPACING.space_10 * 8,
    borderRadius: SPACING.space_10 * 10,
    backgroundColor: COLORS.DarkGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  dayText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
  OutterContainer: {
    marginVertical: SPACING.space_24,
  },
  timeContainer: {
    paddingVertical: SPACING.space_10,
    borderWidth: 1,
    borderColor: COLORS.WhiteRGBA50,
    paddingHorizontal: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_25,
    backgroundColor: COLORS.DarkGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  buttonPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.space_24,
    paddingBottom: SPACING.space_24,
  },
  priceContainer: {
    alignItems: 'center',
  },
  totalPriceText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.Grey,
  },
  price: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
  },
  buttonText: {
    borderRadius: BORDERRADIUS.radius_25,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
    backgroundColor: COLORS.Orange,
  },
});

export default SeatBookingScreen;
