import { Text, View } from "react-native";
import { styles } from "../styles/EmployeeCard.styles";
import { Employee } from "../types/employee";

type Props = {
  employee: Employee;
};

export default function EmployeeCard({ employee }: Props) {
  const getBackgroundColor = () => {
    const age = Number(employee.employee_age);
    if (age >= 50) return "#86EFAC";
    if (age >= 40) return "#FEF08A";
    if (age >= 30) return "#93C5FD";
    if (age >= 20) return "#FCA5A5";
    return "#E5E7EB";
  };

  return (
    <View style={[styles.card, { backgroundColor: getBackgroundColor() }]}>
      <Text style={styles.text}>Name: {employee.employee_name}</Text>
      <Text style={styles.text}>Age: {employee.employee_age}</Text>
      <Text style={styles.text}>Salary: {employee.employee_salary}</Text>
    </View>
  );
}
