import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";

interface SalesData {
  SALESID: string;
  CUSTACCOUNT: string;
  TPI_DPBUSDATE: string;
  PAYMENT: string;
  TPI_DP_NO: string;
  SALESNAME: string;
}
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};
const SalesScreen: React.FC = () => {
  const [sales, setSales] = useState<SalesData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<SalesData[]>("http://192.168.3.7:5000/sales")
      .then((response) => {
        setSales(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ API Error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>กำลังโหลดข้อมูล...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💰 Sales Order</Text>
      <View style={styles.table}>
        <View style={styles.rowHeader}>
          <Text style={styles.cellHeader}>Sales ID</Text>
          <Text style={styles.cellHeader}>Customer</Text>
          <Text style={styles.cellHeader}>DP No</Text>
          <Text style={styles.cellHeader}>Dp Date</Text>
          <Text style={styles.cellHeader}>Payment</Text>
        </View>
        <FlatList
          data={sales}
          keyExtractor={(item) => item.SALESID}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.cell}>{item.SALESID}</Text>
              <Text style={styles.cell}>{item.CUSTACCOUNT}</Text>
              <Text style={styles.cell}>{item.TPI_DP_NO}</Text>
              <Text style={styles.cell}>{item.SALESNAME}</Text>
              <Text style={styles.cell}>{formatDate(item.TPI_DPBUSDATE)}</Text>
              <Text style={[styles.cell, styles.payment]}>{item.PAYMENT}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 15, textAlign: "center", color: "#333" },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 10, fontSize: 16, color: "#555" },
  table: { borderWidth: 1, borderColor: "#ddd", borderRadius: 5, overflow: "hidden" },
  rowHeader: { flexDirection: "row", backgroundColor: "#007bff", padding: 10 },
  row: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#ddd", padding: 10 },
  cellHeader: { flex: 1, fontWeight: "bold", color: "#fff", textAlign: "center" },
  cell: { flex: 1, textAlign: "center", color: "#333" },
  payment: { fontWeight: "bold", color: "#28a745" },
});


export default SalesScreen;

  /* return (
    <View style={styles.container}>
      <Text style={styles.title}>💰 Sales Data</Text>
      <FlatList
        data={sales}
        keyExtractor={(item) => item.SALESID}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.label}>🆔 Sales ID:</Text>
            <Text style={styles.value}>{item.SALESID}</Text>
            <Text style={styles.label}>🏢 Customer:</Text>
            <Text style={styles.value}>{item.CUSTACCOUNT}</Text>
            <Text style={styles.label}>🆔 DP No:</Text>
            <Text style={styles.value}>{item.TPI_DP_NO}</Text>
            <Text style={styles.label}>📅 Delivery Date:</Text>
            <Text style={styles.value}>{item.TPI_DPBUSDATE}</Text>
            <Text style={styles.label}>💵 Payment:</Text>
            <Text style={[styles.value, styles.payment]}>{item.PAYMENT}</Text>
          </View>
        )}
      />
    </View>
  );
}; */

/* const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 15, textAlign: "center", color: "#333" },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 10, fontSize: 16, color: "#555" },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: { fontWeight: "bold", color: "#007bff" },
  value: { fontSize: 16, marginBottom: 5, color: "#333" },
  payment: { fontSize: 18, fontWeight: "bold", color: "#28a745" },
});

export default SalesScreen; */
//========================================

/* import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";

// ✅ กำหนดประเภทของ SalesData ให้ตรงกับ JSON ที่ได้จาก API
interface SalesData {
  SALESID: string;
  CUSTACCOUNT: string;
  TPI_DPBUSDATE: string;
  PAYMENT: string;
  TPI_DP_NO : string;

}

const SalesScreen: React.FC = () => {
  // 🔥 ระบุประเภทของ useState เป็น SalesData[]
  const [sales, setSales] = useState<SalesData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<SalesData[]>("http://192.168.3.7:5000/sales") // ❗ เพิ่ม Type ที่ get API //http://localhost:5000/sales 
      .then((response) => {
        setSales(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ API Error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💰 Sales Data</Text>
      <FlatList
        data={sales}
        keyExtractor={(item) => item.SALESID}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>🆔 Sales ID: {item.SALESID}</Text>
            <Text>🏢 Customer: {item.CUSTACCOUNT}</Text>
            <Text>🆔 DP : {item.TPI_DP_NO}</Text>
            <Text>📅 Delivery Date: {item.TPI_DPBUSDATE}</Text>
            <Text>💵 Payment: {item.PAYMENT}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  item: { padding: 15, marginBottom: 10, backgroundColor: "#fff", borderRadius: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4 },
});

export default SalesScreen;
 */