import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput, StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { COLORS, FONTS, darkGreen } from "../../components/Constants";
import { MaterialIcons } from "@expo/vector-icons";
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomTab from "../../components/BottomTab";
import {colors} from "../../components/themes";

const Profile = ({ navigation }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userAuthenticated, setUserAuthenticated] = useState(false);

    useEffect(() => {
        checkUserAuthentication();
    }, []);

    const checkUserAuthentication = async () => {
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        const token = user.token;
        if (token) {
            setUserAuthenticated(true);
            setName(user.name);
            setEmail(user.email);
            setPassword(user.password);
        }
    };

    const handleImageSelection = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const handleSaveChanges = async () => {
        try {
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            console.log(user);
            const token = user.token;
            if (token) {
                const updatedUserInfo = {
                    name,
                    email,
                    password,
                };

                const response = await Axios.put(
                    "https://greenhomeapi.onrender.com/api/users/update",
                    updatedUserInfo,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status === 200) {
                    console.log(response.data)
                    alert("Informations mises à jour avec succès !");
                } else {
                    alert("Erreur lors de la mise à jour des informations.");
                }
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour des informations :", error);
            alert("Erreur lors de la mise à jour des informations.");
        }
    };

    return (
        <View style={styles.container}>
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
                paddingHorizontal: 22,
            }}
        >
            <View
                style={{
                    marginHorizontal: 12,
                    flexDirection: "row",
                    justifyContent: "center",
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        position: "absolute",
                        left: 0,
                    }}
                >
                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={28}
                        color={COLORS.black}


                    />
                </TouchableOpacity>

                <Text style={{ ...FONTS.h1,  fontFamily: 'Menlo',fontWeight:'700', marginTop: -8, }}>Edit Profile</Text>
            </View>

            <ScrollView>
                <View
                    style={{
                        alignItems: "center",
                        marginVertical: 22,
                    }}
                >
                    <TouchableOpacity onPress={handleImageSelection}>
                        <Image
                            source={{ uri: selectedImage }} // Utilisez l'URI de l'image sélectionnée
                            style={{
                                height: 170,
                                width: 170,
                                borderRadius: 85,
                                borderWidth: 2,
                                borderColor: '#A1E2B0FF',
                            }}
                        />

                        <View
                            style={{
                                position: "absolute",
                                bottom: 0,
                                right: 10,
                                zIndex: 9999,
                            }}
                        >
                            <MaterialIcons
                                name="photo-camera"
                                size={32}
                                color="#A1E2B0FF"
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                <View>
                    <View
                        style={{
                            flexDirection: "column",
                            marginBottom: 6,
                        }}
                    >
                        <Text style={{ ...FONTS.h4 ,fontWeight:'500',fontFamily:'Menlo'}}>Name</Text>
                        <View
                            style={{
                                height: 44,
                                width: "100%",
                                borderColor: COLORS.secondaryGray,
                                borderWidth: 1,
                                borderRadius: 4,
                                marginVertical: 6,
                                justifyContent: "center",
                                paddingLeft: 8,
                            }}
                        >
                            <TextInput
                                value={name}
                                onChangeText={(value) => setName(value)}
                                editable={true}
                            />
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: "column",
                            marginBottom: 6,
                        }}
                    >
                        <Text style={{ ...FONTS.h4 ,fontWeight:'500',fontFamily:'Menlo'}}>Email</Text>
                        <View
                            style={{
                                height: 44,
                                width: "100%",
                                borderColor: COLORS.secondaryGray,
                                borderWidth: 1,
                                borderRadius: 4,
                                marginVertical: 6,
                                justifyContent: "center",
                                paddingLeft: 8,
                            }}
                        >
                            <TextInput
                                value={email}
                                onChangeText={(value) => setEmail(value)}
                                editable={true}
                            />
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: "column",
                            marginBottom: 6,
                        }}
                    >
                        <Text style={{ ...FONTS.h4 ,fontWeight:'500',fontFamily:'Menlo'}}>Password</Text>
                        <View
                            style={{
                                height: 44,
                                width: "100%",
                                borderColor: COLORS.secondaryGray,
                                borderWidth: 1,
                                borderRadius: 4,
                                marginVertical: 6,
                                justifyContent: "center",
                                paddingLeft: 8,
                            }}
                        >
                            <TextInput
                                value={password}
                                onChangeText={(value) => setPassword(value)}
                                editable={true}
                                secureTextEntry

                            />
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: "column",
                            marginBottom: 6,
                        }}
                    >
                        {/* Autres champs de formulaire */}
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: '#A1E2B0FF',
                        height: 44,
                        borderRadius: 6,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onPress={handleSaveChanges}
                >
                    <Text
                        style={{
                            ...FONTS.body3,
                            color: COLORS.black,
                            fontFamily: 'Menlo',
                            fontWeight: '300',
                        }}
                    >
                        Save Changes
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    <BottomTab/>
    </View>

);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light,
    },
});

export default Profile;