import { useState, useEffect, useCallback, useRef } from "react";
import {
    SafeAreaView,
    View,
    StatusBar,
    Text,
    StyleSheet,
    Platform,
    TextInput,
    TouchableOpacity,
    Image
} from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import DateTimerPicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import Footer from "@/src/components/Footer";

import { bgThemeColor, fgThemeColor, secBgThemeColor, textThemeColor } from "@/src/constants/ColorTheming";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

function ConsultasAdd() {
    const navigation = useNavigation();
    const storeData = async () => {
        const notification_dados = {
            data,
            medico,
            especialidade,
            descricao
        }
        try {
            setNotificationDate(text);
            const data = await AsyncStorage.setItem("data", text);
            const medico = await AsyncStorage.setItem("medico", JSON.stringify(notification_dados.medico));
            const especialidade = await AsyncStorage.setItem("especialidade", JSON.stringify(notification_dados.especialidade))
            const descricao = await AsyncStorage.setItem("descricao", JSON.stringify(notification_dados.descricao))
            } catch (e) {
                console.log(e);
                }
            }
    
    const getData = async () => {
        try {
          const value =  await AsyncStorage.getItem("notification_date");
          if(value !== null) {
            setNotificationDate(value);
          }
        } catch (e) {
          alert("erro");
        }
      }

    const AbrirNavMenu = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
    const [text, setText] = useState("");
    const [atualDate, setAtualDate] = useState("");
    const [notificationDate, setNotificationDate] = useState("")
    const [data, Setdata] = useState("");
    const [medico, SetMedico] = useState("");
    const [especialidade, SetEspecialidade] = useState("");
    const [descricao, Setdescricao] = useState("");

    useEffect(() => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var hours = new Date().getHours(); 
        var min = new Date().getMinutes(); 
        setAtualDate(
          date + "/" + month + "/" + year 
          + " " + hours + ":" + min
        );
        console.log(atualDate);
      }, [setTimeout(atualDate, 1000)]);
    
    useEffect(() => {    
            getData();
            if (notificationDate === atualDate){
                alert("entrando na condição")
                Notifications.scheduleNotificationAsync({
                    content: {title: "Chegou a hora de sua consulta/exame!", body:`O médico(a) ${medico}  especialista em ${especialidade} está a sua espera!`}, trigger:null
                })
            }
        }
    ,[setTimeout(atualDate, 1000)]);

    const onChange = (event:any, selectedDate:any) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === "ios");
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear();
        let fTime = tempDate.getHours() + ":" + tempDate.getMinutes();

        setText(fDate + " " + fTime);
    }
    const showMode = (currentMode:any) => {
        setShow(true);
        setMode(currentMode);
    }

    const [fontsLoaded, fontError] = useFonts({
        "armata-regular-400": require("../../../fonts/armata-regular-400.ttf"),
      });   

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);
    
    if (!fontsLoaded && !fontError) {
        return null;
    }
    return(
        <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
            <View style={styles.containerTopoItems}>
                <TouchableOpacity onPress={AbrirNavMenu}>
                <Image
                    source={require("@/src/assets/menu-lateral.png")}
                    style={styles.containerTopoMenuLat}
                ></Image>
                </TouchableOpacity>
                <Text style={styles.containerTopoTexto}>CONSULTAS E EXAMES</Text>
                <Image
                source={require("@/src/assets/perfil.png")}
                style={styles.containerTopoImagem}
                ></Image>
            </View>
               
            <View>
                <Text style={styles.dateTimeText}>{text}</Text>
                <View style={styles.viewBotoesNotificacao}>
                    <TouchableOpacity
                    style={styles.botoesNotificacao}
                    onPress={() => showMode("date")}
                    >
                        <Text style={styles.textoBotoesNotificacao}>Escolher Data</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.botoesNotificacao}
                    onPress={() => showMode("time")}
                    >
                        <Text style={styles.textoBotoesNotificacao}>Escolher Hora</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {show && (
                <DateTimerPicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                />
            )}

            <View style={styles.containerInput}>
                <View style={styles.inputOne}>
                    <Text style={styles.labelTextInput}>Médico</Text>
                    <TextInput 
                    style={styles.textInput} 
                    onChangeText={SetMedico}
                    ></TextInput>
                </View>
                <View>
                    <Text style={styles.labelTextInput}>Especialidade</Text>
                    <TextInput 
                    style={styles.textInput} 
                    onChangeText={SetEspecialidade}></TextInput>
                </View>
                <View>
                    <Text style={styles.labelTextInput}>Descrição</Text>
                    <TextInput
                    style={{backgroundColor:`${secBgThemeColor}`, borderRadius:10, height:"auto", padding:10, marginHorizontal: 26,}} 
                    multiline={true} 
                    numberOfLines={5}
                    maxLength={300}
                    onChangeText={Setdescricao}
                    >
                    </TextInput>
                </View>                
                <TouchableOpacity 
                style={styles.botaoConcluido}
                onPress={storeData}
                >
                    <Text style={styles.textoBotaoConcluido}>Concluido</Text>
                </TouchableOpacity>
            </View>
            <Footer/>
        </SafeAreaView>
        )
    }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: `${bgThemeColor}`,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    containerTopoItems: {
        backgroundColor: `${fgThemeColor}`,
        justifyContent: "space-between",
        paddingHorizontal: 20,
        alignItems: "center",
        flexDirection: "row",
        height: 88,
    },
    containerTopoMenuLat: {
        height: 25,
        width: 35,
    },
    containerTopoTexto: {
        flex:1,
        textAlign:"center",
        fontWeight: "400",
        color: "#ffffff",
        fontSize: 24,
      },
    containerTopoImagem: {
        resizeMode: "contain",
        height: 60,
        width: 60,
    },
    selectContainer: {
        paddingHorizontal: 30,
        paddingVertical: 30,
    },
    dateTimeText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        fontFamily: "armata-regular-400",
    },
    containerInput: {
        paddingVertical: 30,
        paddingHorizontal: 10,
    },
    labelTextInput: {
        color: `${textThemeColor}`,
        backgroundColor: `${bgThemeColor}`,
        fontFamily: "armata-regular-400",
        marginHorizontal: 26,
    },
    textInput: {
        backgroundColor: `${secBgThemeColor}`,
        height: 40,
        borderRadius: 10,
        marginHorizontal: 26,
    },
    inputOne: {
        marginBottom: 20,
    },
    botaoConcluido:{
        backgroundColor: `${fgThemeColor}`, // #58C0F3 PARA DISABLED
        width: 310,
        height: 59,
        alignSelf:"center",
        borderRadius:5,
        marginTop: 15,
    },
    viewBotoesNotificacao:{
        gap: 10,
        marginTop: 25
    },
    botoesNotificacao:{
        width:310,
        height: 33,
        alignSelf:"center",
        backgroundColor: `${fgThemeColor}`,
        borderRadius: 3
    },
    textoBotoesNotificacao:{
        color: "#ffffff",
        margin: "auto",
        fontSize: 15,
        fontWeight: "400",
        opacity: 0.6
    },
    textoBotaoConcluido:{
        margin:"auto",
        fontSize:24,
        color: "#ffffff",
        fontWeight: "400",
        lineHeight: 30,
        opacity: 0.6
    },
});

export default ConsultasAdd;