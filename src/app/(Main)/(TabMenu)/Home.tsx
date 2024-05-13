import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, SafeAreaView, BackHandler, Alert, Platform, StatusBar } from "react-native";
import { router, useNavigation } from "expo-router";
import { useState } from "react";
import * as animatable from "react-native-animatable"
import { DrawerActions } from "@react-navigation/native";

import NotifiCard from "@/src/components/NotifiCard";
import Footer from "@/src/components/Footer";
import { bgThemeColor, fgThemeColor } from "@/src/constants/ColorTheming"

export default function Home(this: any) {
  const [IsModalVisible, setIsModalVisible] = useState(false);

  const navigation = useNavigation();

  const AbrirNavMenu = () => {
      navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerTopo}>
        <TouchableOpacity onPress={AbrirNavMenu}>
          <Image
            source={require("../../../assets/logo_nome.png")}
            style={styles.containerImage}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {this.animation.shake(600).then(() => setIsModalVisible(true))}}>
          <animatable.Image     
            ref={ref => {this.animation = ref;}}
            source={require("../../../assets/notificacao_logo.png")}
            style={styles.containerImageNotificacao}
          ></animatable.Image>
        </TouchableOpacity>
        <Modal 
        visible={IsModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        transparent= {true}
        animationType="slide"
        >
          <View style={styles.containerModal}>
            <NotifiCard
            titulo="Titulo Placeholder"
            mensagem="Mensagem Placeholder"
            />
            <TouchableOpacity 
            style={styles.containerModalBotao}
            onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.containerModalBotaoTexto}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <animatable.View animation="zoomIn" delay={50} style={styles.containerColumns}>
        <View style={styles.containerColumn}>
          <TouchableOpacity
            onPress={() =>
              router.navigate({
                pathname: "./Exames",
              })
            }
          >
            <Image
              source={require("../../../assets/consultaseExames.png")}
              style={styles.containerBotoes}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() =>
            router.navigate({
              pathname: "./Emergencia",
            })
          }
          >
            <Image
              source={require("../../../assets/emergencia.png")}
              style={styles.containerBotoes}
            ></Image>
            
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.navigate({ pathname: "./Configuration" })}
          >
            <Image
              source={require("../../../assets/config.png")}
              style={styles.containerBotoes}
            ></Image>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() =>
              router.navigate({
                pathname: "./Medicamentos",
                
              })
            }
          >
            <Image
              source={require("../../../assets/medicamentos.png")}
              style={styles.containerBotoes}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.navigate({pathname: "./Perfil"})}>
            <Image
              source={require("../../../assets/perfil_nome.png")}
              style={styles.containerBotoes}
            ></Image>
            
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={() => Alert.alert("Deseja sair?", "Você tem certeza que deseja sair do app?",
            [{
              text: "Não",
              style: "cancel",
            },
            {
              text: "Sim",
              onPress: () => BackHandler.exitApp()
            } 
            ]
           )}>
            <Image
              source={require("../../../assets/sair.png")}
              style={styles.containerBotoes}
            ></Image>
          </TouchableOpacity>
        </View>
      </animatable.View>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${bgThemeColor}`,
    width: "100%",
    height: "100%",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  containerTopo: {
    height: 88,
    backgroundColor: `${fgThemeColor}`,
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerImage: {
    width: 190,
    height: 70,
    resizeMode: "contain",
  },
  containerImageNotificacao: {
    width: 35,
    resizeMode: "contain",
  },
  containerColumns: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 65,
  },
  containerColumn: {
    flexDirection: "column",
  },
  containerBotoes: {
    resizeMode: "contain",
    width: 110,
    height: 110,
    marginBottom: 20,
  },
  containerModal:{
    width: "100%",
    maxWidth: 400,
    height: "100%",
    alignSelf: "center",
    marginTop: 140,
    borderRadius: 20,
    backgroundColor: "#c1c1c1"
  },
  containerModalBotao:{
    width: 90,
    height: 35,
    alignSelf: "center",
    backgroundColor: "rgba(32, 162, 235, 1)",
    borderRadius: 15,
    marginTop: 15,
    marginBottom: 15,
    justifyContent: "center"
  },
  containerModalBotaoTexto:{
    alignSelf: "center",
    alignContent: "center",
    fontSize: 15,
    fontWeight: "400",
    color: "#ffffff"
  }
});
