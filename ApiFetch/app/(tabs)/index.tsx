import { useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, Text, View } from "react-native";
import EmployeeCard from "../../components/EmployeeCard";
import { fetchEmployeesAPI } from "../../services/api";
import { styles } from "../../styles/Home.styles";
import { Employee } from "../../types/employee";

export default function HomeScreen() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(false);

    try {
      const json = await fetchEmployeesAPI();

      const filtered = json.data.filter(
        (emp) => Number(emp.employee_salary) > 500000,
      );

      setEmployees(filtered);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading employees...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Failed to load data</Text>
      </View>
    );
  }

  if (employees.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No employees found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Reload" onPress={fetchEmployees} />

      <FlatList
        data={employees}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <EmployeeCard employee={item} />}
      />
    </View>
  );
}
