import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

interface CardData {
  id: number;
  title: string;
  count: string;
  subtitle: string;
  backgroundColor: string;
  textColor: string;
}

const data: CardData[] = [
  {
    id: 1,
    title: "Total Killed",
    count: "32,456",
    subtitle: "Since 2000",
    backgroundColor: "#e74c3c",
    textColor: "#f0f0f0",
  },
  {
    id: 2,
    title: "Killed Today",
    count: "12",
    subtitle: "As of 6pm",
    backgroundColor: "#e67e22",
    textColor: "#f0f0f0",
  },
  {
    id: 3,
    title: "Injured",
    count: "1,234",
    subtitle: "Today",
    backgroundColor: "#f1c40f",
    textColor: "#1a1a1a",
  },
];

const LandingPage = () => {
  const [data, setData] = useState<CardData[]>([]);

  useEffect(() => {
    axios
      .get("https://data.techforpalestine.org/api/v2/casualties_daily.min.json")
      .then((response) => {
        const latestData = response.data[response.data.length - 1];
        const { killed, report_date, injured, killed_cum } = latestData;
        console.log(latestData);

        setData([
          {
            id: 0,
            title: "Killed Today",
            count: killed ? killed.toString() : "0",
            subtitle: `Today`,
            backgroundColor: "#e67e22",
            textColor: "#f0f0f0",
          },
          {
            id: 1,
            title: "Total Killed",
            count: killed_cum ? killed_cum.toString() : "0",
            subtitle: "Since Oct 7th",
            backgroundColor: "#e74c3c",
            textColor: "#f0f0f0",
          },
          {
            id: 2,
            title: "Injured",
            count: injured ? injured.toString() : "0",
            subtitle: "Today",
            backgroundColor: "#f1c40f",
            textColor: "#1a1a1a",
          },
          ...data,
        ]);
      })
      .catch((error) => {
        console.error(error);
      });

    axios.get;
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Open Palestine</Text>
      </View>
      <View style={styles.main}>
        <View style={styles.textContainer}>
          <Text style={styles.mainTitle}>Palestine Data</Text>
          <Text style={styles.mainDescription}>
            This app aims to raise awareness about the devastating impact of the
            ongoing conflict in Palestine, where innocent lives are lost every
            day.
          </Text>
        </View>
        <View style={styles.cardRow}>
          {data.map((item) => (
            <View
              key={item.id}
              style={[styles.card, { backgroundColor: item.backgroundColor }]}
            >
              <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, { color: item.textColor }]}>
                  {item.title}
                </Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={[styles.cardCount, { color: item.textColor }]}>
                  {item.count}
                </Text>
                <Text
                  style={[
                    styles.cardSubtitle,
                    {
                      color: item.textColor === "#f0f0f0" ? "#ccc" : "#1a1a1a",
                    },
                  ]}
                >
                  {item.subtitle}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.learnMoreButton]}>
            <Text style={styles.buttonText}>Learn More</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.donateButton]}>
            <Text style={styles.buttonText}>Donate</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          &copy; 2024 Palestine Casualties. All rights reserved.
        </Text>
        <View style={styles.footerLinks}>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Terms of Service</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Privacy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#1a1a1a",
    color: "#f0f0f0",
  },
  header: {
    height: 56,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f0f0f0",
  },
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#f0f0f0",
  },
  mainDescription: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    maxWidth: 700,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 800,
  },
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardContent: {
    alignItems: "center",
  },
  cardCount: {
    fontSize: 40,
    fontWeight: "bold",
  },
  cardSubtitle: {
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
  },
  button: {
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 32,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  learnMoreButton: {
    backgroundColor: "#2980b9",
  },
  donateButton: {
    backgroundColor: "#7f8c8d",
    borderColor: "#7f8c8d",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#f0f0f0",
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#333",
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#ccc",
    marginBottom: 8,
  },
  footerLinks: {
    flexDirection: "row",
    gap: 16,
  },
  footerLink: {
    fontSize: 12,
    color: "#bbb",
    textDecorationLine: "underline",
  },
});

export default LandingPage;
