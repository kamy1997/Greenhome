import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MainHeader from "../../components/MenuLeft";
import BottomTab from "../../components/BottomTab";


const Settings = ({onLogout}) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [primary_email, setPrimaryEmail] = useState("");

  const checkUserAuthentication = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    const token = user.token;
    if (token) {
      setEmail(user.email);
      setPrimaryEmail(user.primary_email);
    }
  };

  useEffect(() => {
    checkUserAuthentication();
  }, []);


  const handleLogout = async () => {
    onLogout();
    await AsyncStorage.removeItem('user');
  };


  const SECTIONS = [
    {
      header: 'Preferences',
      icon: 'settings',
      items: [
        { icon: 'globe', color: '#fe9400', label: 'Language', type: 'link', page: 'Settings'},
        {
          icon: 'moon',
          color: '#007afe',
          label: 'Dark Mode',
          value: false,
          type: 'boolean',
          page: 'Settings'
        },

        {
          icon: 'users',
          color: '#32c759',
          label: 'Show Members',
          value: true,
          type: 'link',
          page: 'Members'
        },
        {
          icon: 'airplay',
          color: '#fd2d54',
          label: 'Permissions',
          type: 'link',
          page:'Permissions',
          condition: email === primary_email,
        },
      ],
    },
    {
      header: 'Help',
      icon: 'help-circle',
      items: [
        { icon: 'help-circle', color: '#007afe', label: 'Conseils Durables', type: 'link' ,page:'ConseilsDurable' },
        { icon: 'droplet', color: '#8e8d91', label: 'Carbon FootPrint Calculator', type: 'link' ,page:'CarbonCalculator' },

      ],
    },
    {
      header: 'Content',
      icon: 'align-center',
      items: [
        { icon: 'feather', color: 'black', label: 'FAQ', type: 'link', page: 'FAQPage'},
      ],
    },
  ];
    
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {SECTIONS.map(({ header, items }) => (
          <View style={styles.section} key={header}>
            <Text style={styles.sectionHeader}>{header}</Text>
            {items.map(({ label, icon, type, value, color, page,condition}, index) => {
              if (condition !== undefined && !condition) {
                return null; // Ne rend pas cet élément si la condition n'est pas remplie
              }
              return (
                <TouchableOpacity
                  key={label}
                  onPress={() => navigation.navigate(page)}
                  >
                  <View style={styles.row}>
                    <View style={[styles.rowIcon, { backgroundColor: color }]}>
                      <FeatherIcon color="#fff" name={icon} size={18} />
                    </View>
                    <Text style={styles.rowLabel}>{label}</Text>
                    <View style={styles.rowSpacer} />
                    {type === 'boolean' && <Switch value={value} />}
                    {type === 'link' && (
                      <FeatherIcon
                        color="#0c0c0c"
                        name="chevron-right"
                        size={22}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}

          </View>
        ))}
        <TouchableOpacity style={styles.logout} onPress={handleLogout}>
          <View style={styles.btn_logout}>
            <View style={[styles.rowIcon, { backgroundColor: "#fd2d54" }]}>
              <FeatherIcon color="#fff" name={"log-out"} size={18} />
            </View>
            <Text style={styles.rowLabel}>{"Logout"}</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <BottomTab/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    backgroundColor: 'white',
  },
  section: {
    paddingHorizontal: 24,
  },
  logout: {
    paddingHorizontal: 24,
    marginTop:95,
    alignItems: "center", // Ajoutez cette ligne pour centrer horizontalement
    },
  sectionHeader: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: '600',
    color: '#9e9e9e',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  profile: {
    padding: 24,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  profileAvatarWrapper: {
    position: 'relative',
  },
  profileAction: {
    position: 'absolute',
    right: -4,
    bottom: -10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: '#007bff',
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: '600',
    color: '#414d63',
    textAlign: 'center',
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: '#989898',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  btn_logout: {
    alignItems: 'center',
    height: 50,
    width:'100%',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection:'row',
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '400',
    color: '#0c0c0c',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});
export default Settings;