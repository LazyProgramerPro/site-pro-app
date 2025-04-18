// import { useNavigation, useRoute } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import React from "react";
// import { ScrollView, StyleSheet, View } from "react-native";
// import { useForm, Controller } from "react-hook-form";
// import { DatePickerInput } from "react-native-paper-dates";
// import {
//   Text,
//   TextInput,
//   Button,
//   Chip,
//   HelperText,
//   Divider,
//   List,
// } from "react-native-paper";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import DocumentPickerComponent from "../../components/acceptance-request/DocumentPicker";
// import ImagePickerComponent from "../../components/acceptance-request/ImagePicker";
// import CategoryAcceptance from "../../components/category-acceptance/CategoryAcceptance";
// import ScreenHeader from "../../components/ui/ScreenHeader";
// import ScreenWrapper from "../../components/ui/ScreenWrapper";
// import {
//   AddAcceptanceRequestRouteParams,
//   DashboardStackParamList,
// } from "../../navigation/stacks/DashboardStack";
// import DropDown from "react-native-paper-dropdown";

// export default function AddAcceptanceRequestScreen() {
//   const route = useRoute();
//   const navigation =
//     useNavigation<NativeStackNavigationProp<DashboardStackParamList>>();

//   // Get route params
//   const { location, projectId, constructionId } =
//     route.params as AddAcceptanceRequestRouteParams;

//   // Show dropdown states
//   const [showLocationDropDown, setShowLocationDropDown] = React.useState(false);
//   const [showApproverDropDown, setShowApproverDropDown] = React.useState(false);

//   // Status variable
//   const status = "Đang xử lý";

//   // Example nearby locations
//   const nearbyLocations = [
//     { label: "Địa điểm 1", value: "1" },
//     { label: "Địa điểm 2", value: "2" },
//     { label: "Địa điểm 3", value: "3" },
//   ];

//   // Example approvers list
//   const approversList = [
//     { label: "Nguyễn Văn A", value: "1" },
//     { label: "Trần Thị B", value: "2" },
//     { label: "Lê Văn C", value: "3" },
//   ];

//   // Set up React Hook Form
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       requestName: "",
//       notes: "",
//       location: "",
//       date: new Date(),
//       nearbyLocation: "",
//       city: "",
//       weather: "",
//       teamLeader: "",
//       approver: "",
//     },
//   });

//   const onSubmit = (data) => {
//     console.log("Form submitted:", data);
//     // Handle form submission logic here
//   };

//   return (
//     <ScreenWrapper>
//       <View style={styles.container}>
//         <ScreenHeader
//           title="Thông tin yêu cầu nghiệm thu"
//           onBackPress={() => navigation.goBack()}
//           onOpenMenuPress={() => {}}
//           showBackButton={true}
//           rightIcon="more-vertical"
//         />

//         <ScrollView style={styles.formContainer}>
//           {/* Status info */}
//           <View style={styles.infoRow}>
//             <Text variant="bodyLarge" style={styles.label}>
//               Trạng thái:
//             </Text>
//             <Chip mode="outlined" textStyle={styles.statusText}>
//               {status}
//             </Chip>
//           </View>

//           <View style={styles.infoRow}>
//             <Text variant="bodyLarge" style={styles.label}>
//               Người thay đổi:
//             </Text>
//             <Text variant="bodyMedium">thuongdev</Text>
//           </View>

//           <Divider style={styles.divider} />

//           {/* Request name */}
//           <Controller
//             control={control}
//             rules={{ required: "Tên yêu cầu nghiệm thu là bắt buộc" }}
//             name="requestName"
//             render={({ field: { onChange, onBlur, value } }) => (
//               <>
//                 <Text variant="bodyLarge" style={styles.fieldLabel}>
//                   Tên yêu cầu nghiệm thu
//                 </Text>
//                 <TextInput
//                   mode="outlined"
//                   value={value}
//                   onChangeText={onChange}
//                   onBlur={onBlur}
//                   placeholder="Nhập tên yêu cầu nghiệm thu"
//                   error={!!errors.requestName}
//                 />
//                 {errors.requestName && (
//                   <HelperText type="error">
//                     {errors.requestName.message}
//                   </HelperText>
//                 )}
//               </>
//             )}
//           />

//           {/* Notes */}
//           <Controller
//             control={control}
//             name="notes"
//             render={({ field: { onChange, onBlur, value } }) => (
//               <>
//                 <Text variant="bodyLarge" style={styles.fieldLabel}>
//                   Ghi chú
//                 </Text>
//                 <TextInput
//                   mode="outlined"
//                   value={value}
//                   onChangeText={onChange}
//                   onBlur={onBlur}
//                   placeholder="Ghi chú"
//                   multiline={true}
//                   numberOfLines={4}
//                 />
//               </>
//             )}
//           />

//           {/* Location */}
//           <Controller
//             control={control}
//             name="location"
//             render={({ field: { onChange, onBlur, value } }) => (
//               <>
//                 <Text variant="bodyLarge" style={styles.fieldLabel}>
//                   Địa điểm
//                 </Text>
//                 <TextInput
//                   mode="outlined"
//                   value={value}
//                   onChangeText={onChange}
//                   onBlur={onBlur}
//                   placeholder="Địa điểm"
//                 />
//               </>
//             )}
//           />

//           {/* Date field */}
//           <Text variant="bodyLarge" style={styles.fieldLabel}>
//             Thời gian
//           </Text>
//           <Controller
//             control={control}
//             name="date"
//             render={({ field: { onChange, value } }) => (
//               <DatePickerInput
//                 locale="vi"
//                 value={value}
//                 onChange={onChange}
//                 inputMode="start"
//                 style={styles.dateInput}
//                 mode="outlined"
//                 presentationStyle="pageSheet"
//                 withDateFormatInLabel={false}
//                 placeholderText="Chọn ngày giờ"
//                 validRange={{
//                   startDate: new Date(),
//                 }}
//               />
//             )}
//           />

//           {/* Nearby locations section */}
//           <Text variant="bodyLarge" style={styles.sectionTitle}>
//             Các vị trí gần địa điểm hiện tại:
//           </Text>
//           <Controller
//             control={control}
//             name="nearbyLocation"
//             render={({ field: { onChange, value } }) => (
//               <DropDown
//                 label={"Chọn địa điểm"}
//                 mode="outlined"
//                 visible={showLocationDropDown}
//                 showDropDown={() => setShowLocationDropDown(true)}
//                 onDismiss={() => setShowLocationDropDown(false)}
//                 value={value}
//                 setValue={onChange}
//                 list={nearbyLocations}
//               />
//             )}
//           />

//           {/* City field */}
//           <Controller
//             control={control}
//             name="city"
//             render={({ field: { onChange, onBlur, value } }) => (
//               <>
//                 <Text variant="bodyLarge" style={styles.fieldLabel}>
//                   Thành phố
//                 </Text>
//                 <TextInput
//                   mode="outlined"
//                   value={value}
//                   onChangeText={onChange}
//                   onBlur={onBlur}
//                   placeholder="Thành phố"
//                 />
//               </>
//             )}
//           />

//           <Text variant="bodyMedium" style={styles.coordinates}>
//             Tọa độ: {location.latitude.toFixed(6)},{" "}
//             {location.longitude.toFixed(6)}
//           </Text>

//           {/* Image upload section */}
//           <Text variant="bodyLarge" style={styles.fieldLabel}>
//             Hình ảnh
//           </Text>
//           <ImagePickerComponent />

//           {/* Weather field */}
//           <Controller
//             control={control}
//             name="weather"
//             render={({ field: { onChange, onBlur, value } }) => (
//               <>
//                 <Text variant="bodyLarge" style={styles.fieldLabel}>
//                   Thời tiết
//                 </Text>
//                 <TextInput
//                   mode="outlined"
//                   value={value}
//                   onChangeText={onChange}
//                   onBlur={onBlur}
//                   placeholder="Thời tiết"
//                 />
//               </>
//             )}
//           />

//           <Text variant="bodyLarge" style={styles.fieldLabel}>
//             Người trưởng nhóm | Người phê duyệt
//           </Text>
//           <Controller
//             control={control}
//             name="approver"
//             render={({ field: { onChange, value } }) => (
//               <DropDown
//                 label={"Chọn người từ danh sách"}
//                 mode="outlined"
//                 visible={showApproverDropDown}
//                 showDropDown={() => setShowApproverDropDown(true)}
//                 onDismiss={() => setShowApproverDropDown(false)}
//                 value={value}
//                 setValue={onChange}
//                 list={approversList}
//                 left={<TextInput.Icon icon="account" />}
//               />
//             )}
//           />

//           <Text
//             variant="bodyLarge"
//             style={[styles.fieldLabel, { marginTop: 10 }]}
//           >
//             Danh mục nghiệm thu
//           </Text>
//           <CategoryAcceptance />

//           <Text variant="bodyLarge" style={styles.fieldLabel}>
//             Danh sách văn bản đính kèm:
//           </Text>
//           <DocumentPickerComponent />

//           <Button
//             mode="contained"
//             onPress={handleSubmit(onSubmit)}
//             style={styles.submitButton}
//           >
//             Gửi yêu cầu nghiệm thu
//           </Button>
//         </ScrollView>
//       </View>
//     </ScreenWrapper>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   formContainer: {
//     flex: 1,
//     padding: 16,
//   },
//   infoRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   label: {
//     fontWeight: "500",
//     color: "#333",
//     marginRight: 8,
//   },
//   statusText: {
//     color: "#2196F3",
//   },
//   divider: {
//     marginVertical: 10,
//   },
//   fieldLabel: {
//     fontWeight: "500",
//     marginTop: 16,
//     marginBottom: 8,
//     color: "#333",
//   },
//   sectionTitle: {
//     fontWeight: "500",
//     marginTop: 20,
//     marginBottom: 8,
//     color: "#333",
//   },
//   coordinates: {
//     color: "#666",
//     marginTop: 8,
//     marginBottom: 20,
//   },
//   dateInput: {
//     backgroundColor: "#fff",
//     marginBottom: 10,
//   },
//   submitButton: {
//     marginVertical: 24,
//     paddingVertical: 6,
//   },
// });
// import React from "react";
// import { ScrollView, StyleSheet, View, Text, Platform } from "react-native";
// import { TextInput, Button, HelperText } from "react-native-paper";
// import { useForm, Controller } from "react-hook-form";
// import { DatePickerInput } from "react-native-paper-dates";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { Dropdown } from "react-native-element-dropdown";
// import Icon from "react-native-vector-icons/MaterialIcons";

// import DocumentPickerComponent from "../../components/acceptance-request/DocumentPicker";
// import ImagePickerComponent from "../../components/acceptance-request/ImagePicker";
// import CategoryAcceptance from "../../components/category-acceptance/CategoryAcceptance";
// import ScreenHeader from "../../components/ui/ScreenHeader";
// import ScreenWrapper from "../../components/ui/ScreenWrapper";
// import {
//   AddAcceptanceRequestRouteParams,
//   DashboardStackParamList,
// } from "../../navigation/stacks/DashboardStack";

// type FormData = {
//   requestName: string;
//   notes: string;
//   location: string;
//   city: string;
//   date: Date | undefined;
//   weather: string;
//   approver: string | null;
//   nearbyLocation: string | null;
// };

// export default function AddAcceptanceRequestScreen() {
//   const route = useRoute();
//   const navigation =
//     useNavigation<NativeStackNavigationProp<DashboardStackParamList>>();

//   const { location, projectId, constructionId } =
//     route.params as AddAcceptanceRequestRouteParams;

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     defaultValues: {
//       requestName: "",
//       notes: "",
//       location: "",
//       city: "",
//       date: new Date(),
//       weather: "",
//       approver: null,
//       nearbyLocation: null,
//     },
//   });

//   const nearbyLocations = [
//     { label: "Địa điểm 1", value: "1" },
//     { label: "Địa điểm 2", value: "2" },
//     { label: "Địa điểm 3", value: "3" },
//   ];

//   const approversList = [
//     { label: "Nguyễn Văn A", value: "1" },
//     { label: "Trần Thị B", value: "2" },
//     { label: "Lê Văn C", value: "3" },
//   ];

//   const status = "Đang xử lý";

//   const onSubmit = (data: FormData) => {
//     console.log("Form submitted:", data);
//   };

//   return (
//     <ScreenWrapper>
//       <View style={styles.container}>
//         <ScreenHeader
//           title="Thông tin yêu cầu nghiệm thu"
//           onBackPress={() => navigation.goBack()}
//           showBackButton
//           rightIcon="more-vertical"
//         />

//         <ScrollView style={styles.formContainer}>
//           {/* Trạng thái */}
//           <View style={styles.infoRow}>
//             <Text style={styles.label}>Trạng thái:</Text>
//             <Text style={styles.statusValue}>{status}</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <Text style={styles.label}>Người thay đổi:</Text>
//             <Text style={styles.value}>thuongdev</Text>
//           </View>

//           {/* Tên yêu cầu */}
//           <Controller
//             control={control}
//             name="requestName"
//             rules={{ required: "Bắt buộc" }}
//             render={({ field: { onChange, value } }) => (
//               <TextInput
//                 label="Tên yêu cầu nghiệm thu"
//                 mode="outlined"
//                 value={value}
//                 onChangeText={onChange}
//                 error={!!errors.requestName}
//               />
//             )}
//           />
//           <HelperText type="error" visible={!!errors.requestName}>
//             {errors.requestName?.message}
//           </HelperText>

//           {/* Ghi chú */}
//           <Controller
//             control={control}
//             name="notes"
//             render={({ field: { onChange, value } }) => (
//               <TextInput
//                 label="Ghi chú"
//                 mode="outlined"
//                 value={value}
//                 onChangeText={onChange}
//                 multiline
//                 numberOfLines={4}
//               />
//             )}
//           />

//           {/* Địa điểm */}
//           <Controller
//             control={control}
//             name="location"
//             render={({ field: { onChange, value } }) => (
//               <TextInput
//                 label="Địa điểm"
//                 mode="outlined"
//                 value={value}
//                 onChangeText={onChange}
//               />
//             )}
//           />

//           {/* Thời gian */}
//           <Controller
//             control={control}
//             name="date"
//             render={({ field: { onChange, value } }) => (
//               <DatePickerInput
//                 locale="vi"
//                 value={value}
//                 onChange={onChange}
//                 inputMode="start"
//                 style={styles.dateInput}
//                 mode="outlined"
//                 placeholderText="Chọn ngày giờ"
//               />
//             )}
//           />

//           {/* Địa điểm gần */}
//           <Controller
//             control={control}
//             name="nearbyLocation"
//             render={({ field: { onChange, value } }) => (
//               <Dropdown
//                 style={styles.dropdown}
//                 placeholder="Chọn địa điểm"
//                 data={nearbyLocations}
//                 labelField="label"
//                 valueField="value"
//                 value={value}
//                 onChange={(item) => onChange(item.value)}
//               />
//             )}
//           />

//           {/* Thành phố */}
//           <Controller
//             control={control}
//             name="city"
//             render={({ field: { onChange, value } }) => (
//               <TextInput
//                 label="Thành phố"
//                 mode="outlined"
//                 value={value}
//                 onChangeText={onChange}
//               />
//             )}
//           />

//           {/* Tọa độ */}
//           <Text style={styles.coordinates}>
//             Tọa độ: {location.latitude.toFixed(6)},{" "}
//             {location.longitude.toFixed(6)}
//           </Text>

//           {/* Hình ảnh */}
//           <Text style={styles.fieldLabel}>Hình ảnh</Text>
//           <ImagePickerComponent />

//           {/* Thời tiết */}
//           <Controller
//             control={control}
//             name="weather"
//             render={({ field: { onChange, value } }) => (
//               <TextInput
//                 label="Thời tiết"
//                 mode="outlined"
//                 value={value}
//                 onChangeText={onChange}
//               />
//             )}
//           />

//           {/* Người trưởng nhóm / Người phê duyệt */}
//           <Text style={styles.fieldLabel}>
//             Người trưởng nhóm / Người phê duyệt
//           </Text>
//           <Controller
//             control={control}
//             name="approver"
//             render={({ field: { onChange, value } }) => (
//               <Dropdown
//                 style={styles.dropdown}
//                 placeholder="Chọn người"
//                 data={approversList}
//                 labelField="label"
//                 valueField="value"
//                 value={value}
//                 onChange={(item) => onChange(item.value)}
//                 renderLeftIcon={() => (
//                   <Icon
//                     name="person"
//                     size={20}
//                     color="#888"
//                     style={{ marginRight: 8 }}
//                   />
//                 )}
//               />
//             )}
//           />

//           {/* Danh mục nghiệm thu */}
//           <Text style={styles.fieldLabel}>Danh mục nghiệm thu</Text>
//           <CategoryAcceptance />

//           {/* Tài liệu đính kèm */}
//           <Text style={styles.fieldLabel}>Danh sách văn bản đính kèm:</Text>
//           <DocumentPickerComponent />

//           {/* Submit */}
//           <Button
//             mode="contained"
//             onPress={handleSubmit(onSubmit)}
//             style={{ marginTop: 20 }}
//           >
//             Gửi yêu cầu
//           </Button>
//         </ScrollView>
//       </View>
//     </ScreenWrapper>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   formContainer: {
//     flex: 1,
//     padding: 16,
//   },
//   infoRow: {
//     flexDirection: "row",
//     marginBottom: 10,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#333",
//     marginRight: 8,
//   },
//   statusValue: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#2196F3",
//   },
//   value: {
//     fontSize: 16,
//     color: "#333",
//   },
//   fieldLabel: {
//     fontSize: 16,
//     fontWeight: "500",
//     marginTop: 16,
//     marginBottom: 8,
//     color: "#333",
//   },
//   coordinates: {
//     fontSize: 14,
//     color: "#666",
//     marginTop: 8,
//     marginBottom: 20,
//   },
//   dateInput: {
//     backgroundColor: "#fff",
//     marginBottom: 10,
//   },
//   dropdown: {
//     height: 50,
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     paddingHorizontal: 12,
//     marginBottom: 15,
//   },
// });

// import React, { useState } from "react";
// import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
// import {
//   Text,
//   TextInput,
//   Button,
//   HelperText,
//   Chip,
//   Divider,
//   Card,
//   Surface,
//   Avatar,
//   IconButton,
//   useTheme,
// } from "react-native-paper";
// import { useForm, Controller } from "react-hook-form";
// import { DatePickerInput } from "react-native-paper-dates";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { Dropdown } from "react-native-element-dropdown";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import * as Animatable from "react-native-animatable";

// import DocumentPickerComponent from "../../components/acceptance-request/DocumentPicker";
// import ImagePickerComponent from "../../components/acceptance-request/ImagePicker";
// import CategoryAcceptance from "../../components/category-acceptance/CategoryAcceptance";
// import ScreenHeader from "../../components/ui/ScreenHeader";
// import ScreenWrapper from "../../components/ui/ScreenWrapper";
// import {
//   AddAcceptanceRequestRouteParams,
//   DashboardStackParamList,
// } from "../../navigation/stacks/DashboardStack";

// type FormData = {
//   requestName: string;
//   notes: string;
//   location: string;
//   city: string;
//   date: Date | undefined;
//   weather: string;
//   approver: string | null;
//   nearbyLocation: string | null;
// };

// export default function AddAcceptanceRequestScreen() {
//   const theme = useTheme();
//   const route = useRoute();
//   const navigation =
//     useNavigation<NativeStackNavigationProp<DashboardStackParamList>>();

//   const { location, projectId, constructionId } =
//     route.params as AddAcceptanceRequestRouteParams;

//   // Section expand/collapse state
//   const [expandedSections, setExpandedSections] = useState({
//     basicInfo: true,
//     location: true,
//     media: true,
//     people: true,
//     categories: true,
//     documents: true,
//   });

//   const toggleSection = (section) => {
//     setExpandedSections({
//       ...expandedSections,
//       [section]: !expandedSections[section],
//     });
//   };

//   const {
//     control,
//     handleSubmit,
//     formState: { errors, dirtyFields },
//     watch,
//   } = useForm<FormData>({
//     defaultValues: {
//       requestName: "",
//       notes: "",
//       location: "",
//       city: "",
//       date: new Date(),
//       weather: "",
//       approver: null,
//       nearbyLocation: null,
//     },
//   });

//   const nearbyLocations = [
//     { label: "Địa điểm 1", value: "1" },
//     { label: "Địa điểm 2", value: "2" },
//     { label: "Địa điểm 3", value: "3" },
//   ];

//   const approversList = [
//     { label: "Nguyễn Văn A", value: "1" },
//     { label: "Trần Thị B", value: "2" },
//     { label: "Lê Văn C", value: "3" },
//   ];

//   // Calculate completion progress
//   const totalFields = 7; // Total number of main fields
//   const completedFields = Object.keys(dirtyFields).length;
//   const progressPercent = Math.round((completedFields / totalFields) * 100);

//   const onSubmit = (data: FormData) => {
//     console.log("Form submitted:", data);
//   };

//   // For rendering section headers with toggle
//   const SectionHeader = ({ title, section, icon }) => (
//     <TouchableOpacity onPress={() => toggleSection(section)}>
//       <Surface style={styles.sectionHeader} elevation={1}>
//         <View style={styles.sectionHeaderContent}>
//           <Avatar.Icon
//             size={36}
//             icon={icon}
//             style={{ backgroundColor: theme.colors.primaryContainer }}
//             color={theme.colors.primary}
//           />
//           <Text style={styles.sectionHeaderText}>{title}</Text>
//         </View>
//         <IconButton
//           icon={expandedSections[section] ? "chevron-up" : "chevron-down"}
//           size={24}
//         />
//       </Surface>
//     </TouchableOpacity>
//   );

//   return (
//     <ScreenWrapper>
//       <View style={styles.container}>
//         <ScreenHeader
//           title="Thông tin yêu cầu nghiệm thu"
//           onBackPress={() => navigation.goBack()}
//           onOpenMenuPress={() => {}}
//           showBackButton
//           rightIcon="more-vertical"
//         />

//         {/* Progress indicator */}
//         <View style={styles.progressContainer}>
//           <View style={styles.progressBar}>
//             <View
//               style={[
//                 styles.progressFill,
//                 {
//                   width: `${progressPercent}%`,
//                   backgroundColor: theme.colors.primary,
//                 },
//               ]}
//             />
//           </View>
//           <Text style={styles.progressText}>{progressPercent}% hoàn thành</Text>
//         </View>

//         <ScrollView style={styles.formContainer}>
//           {/* Status section */}
//           <Card style={styles.statusCard}>
//             <Card.Content>
//               <View style={styles.statusRow}>
//                 <Text style={styles.statusLabel}>Trạng thái:</Text>
//                 <Chip
//                   mode="outlined"
//                   style={styles.statusChip}
//                   textStyle={{ color: theme.colors.primary }}
//                 >
//                   Đang xử lý
//                 </Chip>
//               </View>
//               <View style={styles.infoRow}>
//                 <Text style={styles.label}>Người thay đổi:</Text>
//                 <Text style={styles.value}>thuongdev</Text>
//               </View>
//             </Card.Content>
//           </Card>

//           {/* Basic Information Section */}
//           <SectionHeader
//             title="Thông tin cơ bản"
//             section="basicInfo"
//             icon="information-outline"
//           />

//           {expandedSections.basicInfo && (
//             <Animatable.View
//               animation="fadeIn"
//               duration={400}
//               style={styles.sectionContent}
//             >
//               {/* Tên yêu cầu */}
//               <Controller
//                 control={control}
//                 name="requestName"
//                 rules={{ required: "Tên yêu cầu không được để trống" }}
//                 render={({ field: { onChange, value } }) => (
//                   <TextInput
//                     label="Tên yêu cầu nghiệm thu *"
//                     mode="outlined"
//                     value={value}
//                     onChangeText={onChange}
//                     error={!!errors.requestName}
//                     left={<TextInput.Icon icon="format-title" />}
//                     style={styles.input}
//                   />
//                 )}
//               />
//               {errors.requestName && (
//                 <HelperText type="error" visible={!!errors.requestName}>
//                   {errors.requestName?.message}
//                 </HelperText>
//               )}

//               {/* Ghi chú */}
//               <Controller
//                 control={control}
//                 name="notes"
//                 render={({ field: { onChange, value } }) => (
//                   <TextInput
//                     label="Ghi chú"
//                     mode="outlined"
//                     value={value}
//                     onChangeText={onChange}
//                     multiline
//                     numberOfLines={4}
//                     left={<TextInput.Icon icon="note-text-outline" />}
//                     style={styles.input}
//                   />
//                 )}
//               />

//               {/* Thời gian */}
//               <Controller
//                 control={control}
//                 name="date"
//                 render={({ field: { onChange, value } }) => (
//                   <DatePickerInput
//                     locale="vi"
//                     label="Thời gian"
//                     value={value}
//                     onChange={onChange}
//                     inputMode="start"
//                     style={styles.dateInput}
//                     mode="outlined"
//                     placeholderText="Chọn ngày giờ"
//                     presentationStyle="pageSheet"
//                     left={<TextInput.Icon icon="calendar" />}
//                   />
//                 )}
//               />
//             </Animatable.View>
//           )}

//           {/* Location Section */}
//           <SectionHeader
//             title="Địa điểm"
//             section="location"
//             icon="map-marker"
//           />

//           {expandedSections.location && (
//             <Animatable.View
//               animation="fadeIn"
//               duration={400}
//               style={styles.sectionContent}
//             >
//               {/* Địa điểm */}
//               <Controller
//                 control={control}
//                 name="location"
//                 render={({ field: { onChange, value } }) => (
//                   <TextInput
//                     label="Địa điểm"
//                     mode="outlined"
//                     value={value}
//                     onChangeText={onChange}
//                     left={<TextInput.Icon icon="map-marker" />}
//                     style={styles.input}
//                   />
//                 )}
//               />

//               {/* Địa điểm gần */}
//               <Text style={styles.dropdownLabel}>Vị trí gần đây</Text>
//               <Controller
//                 control={control}
//                 name="nearbyLocation"
//                 render={({ field: { onChange, value } }) => (
//                   <Dropdown
//                     style={styles.dropdown}
//                     placeholderStyle={styles.dropdownPlaceholder}
//                     selectedTextStyle={styles.dropdownSelectedText}
//                     placeholder="Chọn địa điểm gần đây"
//                     data={nearbyLocations}
//                     labelField="label"
//                     valueField="value"
//                     value={value}
//                     onChange={(item) => onChange(item.value)}
//                     renderLeftIcon={() => (
//                       <Icon
//                         name="place"
//                         size={20}
//                         color={theme.colors.primary}
//                         style={styles.dropdownIcon}
//                       />
//                     )}
//                   />
//                 )}
//               />

//               {/* Thành phố */}
//               <Controller
//                 control={control}
//                 name="city"
//                 render={({ field: { onChange, value } }) => (
//                   <TextInput
//                     label="Thành phố"
//                     mode="outlined"
//                     value={value}
//                     onChangeText={onChange}
//                     left={<TextInput.Icon icon="city" />}
//                     style={styles.input}
//                   />
//                 )}
//               />

//               {/* Tọa độ */}
//               <Surface style={styles.coordinatesContainer} elevation={1}>
//                 <Icon name="gps-fixed" size={20} color={theme.colors.primary} />
//                 <Text style={styles.coordinates}>
//                   {location.latitude.toFixed(6)},{" "}
//                   {location.longitude.toFixed(6)}
//                 </Text>
//               </Surface>

//               {/* Thời tiết */}
//               <Controller
//                 control={control}
//                 name="weather"
//                 render={({ field: { onChange, value } }) => (
//                   <TextInput
//                     label="Thời tiết"
//                     mode="outlined"
//                     value={value}
//                     onChangeText={onChange}
//                     left={<TextInput.Icon icon="weather-partly-cloudy" />}
//                     style={styles.input}
//                   />
//                 )}
//               />
//             </Animatable.View>
//           )}

//           {/* Media Section */}
//           <SectionHeader
//             title="Hình ảnh & Media"
//             section="media"
//             icon="image"
//           />

//           {expandedSections.media && (
//             <Animatable.View
//               animation="fadeIn"
//               duration={400}
//               style={styles.sectionContent}
//             >
//               <ImagePickerComponent />
//             </Animatable.View>
//           )}

//           {/* People Section */}
//           <SectionHeader
//             title="Người phê duyệt"
//             section="people"
//             icon="account-multiple"
//           />

//           {expandedSections.people && (
//             <Animatable.View
//               animation="fadeIn"
//               duration={400}
//               style={styles.sectionContent}
//             >
//               <Text style={styles.dropdownLabel}>
//                 Người trưởng nhóm / Người phê duyệt
//               </Text>
//               <Controller
//                 control={control}
//                 name="approver"
//                 render={({ field: { onChange, value } }) => (
//                   <Dropdown
//                     style={styles.dropdown}
//                     placeholderStyle={styles.dropdownPlaceholder}
//                     selectedTextStyle={styles.dropdownSelectedText}
//                     placeholder="Chọn người phê duyệt"
//                     data={approversList}
//                     labelField="label"
//                     valueField="value"
//                     value={value}
//                     onChange={(item) => onChange(item.value)}
//                     renderLeftIcon={() => (
//                       <Icon
//                         name="person"
//                         size={20}
//                         color={theme.colors.primary}
//                         style={styles.dropdownIcon}
//                       />
//                     )}
//                   />
//                 )}
//               />
//             </Animatable.View>
//           )}

//           {/* Categories Section */}
//           <SectionHeader
//             title="Danh mục nghiệm thu"
//             section="categories"
//             icon="format-list-bulleted"
//           />

//           {expandedSections.categories && (
//             <Animatable.View
//               animation="fadeIn"
//               duration={400}
//               style={styles.sectionContent}
//             >
//               <CategoryAcceptance />
//             </Animatable.View>
//           )}

//           {/* Documents Section */}
//           <SectionHeader
//             title="Tài liệu đính kèm"
//             section="documents"
//             icon="file-document-multiple"
//           />

//           {expandedSections.documents && (
//             <Animatable.View
//               animation="fadeIn"
//               duration={400}
//               style={styles.sectionContent}
//             >
//               <DocumentPickerComponent />
//             </Animatable.View>
//           )}

//           {/* Submit Button */}
//           <Button
//             mode="contained"
//             onPress={handleSubmit(onSubmit)}
//             style={styles.submitButton}
//             contentStyle={styles.submitButtonContent}
//             icon="check-circle"
//           >
//             Gửi yêu cầu nghiệm thu
//           </Button>
//         </ScrollView>
//       </View>
//     </ScreenWrapper>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   formContainer: {
//     flex: 1,
//     padding: 16,
//   },
//   progressContainer: {
//     padding: 12,
//     backgroundColor: "#fff",
//     borderBottomWidth: 1,
//     borderBottomColor: "#e0e0e0",
//   },
//   progressBar: {
//     height: 8,
//     backgroundColor: "#e0e0e0",
//     borderRadius: 4,
//     overflow: "hidden",
//   },
//   progressFill: {
//     height: "100%",
//     borderRadius: 4,
//   },
//   progressText: {
//     textAlign: "right",
//     marginTop: 4,
//     fontSize: 12,
//     color: "#666",
//   },
//   statusCard: {
//     marginBottom: 16,
//     borderRadius: 12,
//   },
//   statusRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   statusLabel: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#333",
//     marginRight: 8,
//   },
//   statusChip: {
//     borderRadius: 16,
//   },
//   infoRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#333",
//     marginRight: 8,
//   },
//   value: {
//     fontSize: 16,
//     color: "#333",
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: 12,
//     borderRadius: 12,
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   sectionHeaderContent: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   sectionHeaderText: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginLeft: 12,
//   },
//   sectionContent: {
//     padding: 12,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     marginBottom: 8,
//   },
//   input: {
//     marginBottom: 12,
//     backgroundColor: "#fff",
//   },
//   dateInput: {
//     marginBottom: 12,
//     backgroundColor: "#fff",
//   },
//   dropdownLabel: {
//     fontSize: 16,
//     marginBottom: 8,
//     color: "#333",
//     fontWeight: "500",
//   },
//   dropdown: {
//     height: 56,
//     backgroundColor: "#fff",
//     borderRadius: 4,
//     borderWidth: 1,
//     borderColor: "#bdbdbd",
//     paddingHorizontal: 12,
//     marginBottom: 16,
//   },
//   dropdownPlaceholder: {
//     color: "#9e9e9e",
//     fontSize: 16,
//   },
//   dropdownSelectedText: {
//     color: "#333",
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   dropdownIcon: {
//     marginRight: 8,
//   },
//   coordinatesContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,
//     backgroundColor: "#f7f7f7",
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   coordinates: {
//     fontSize: 14,
//     color: "#666",
//     marginLeft: 8,
//   },
//   submitButton: {
//     marginVertical: 24,
//     borderRadius: 8,
//   },
//   submitButtonContent: {
//     paddingVertical: 8,
//   },
// });

import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Dropdown } from "react-native-element-dropdown";
import {
  Avatar,
  Card,
  Chip,
  HelperText,
  Surface,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import Icon from "react-native-vector-icons/MaterialIcons";

import DocumentPickerComponent from "../../components/acceptance-request/DocumentPicker";
import ImagePickerComponent from "../../components/acceptance-request/ImagePicker";
import CategoryAcceptance from "../../components/category-acceptance/CategoryAcceptance";
import ScreenHeader from "../../components/ui/ScreenHeader";
import ScreenWrapper from "../../components/ui/ScreenWrapper";
import {
  AddAcceptanceRequestRouteParams,
  DashboardStackParamList,
} from "../../navigation/stacks/DashboardStack";

type FormData = {
  requestName: string;
  notes: string;
  location: string;
  city: string;
  date: Date | undefined;
  weather: string;
  approver: string | null;
  nearbyLocation: string | null;
};

export default function AddAcceptanceRequestScreen() {
  const theme = useTheme();
  const route = useRoute();
  const navigation =
    useNavigation<NativeStackNavigationProp<DashboardStackParamList>>();

  const { location, projectId, constructionId } =
    route.params as AddAcceptanceRequestRouteParams;

  // Section expand/collapse state
  const [expandedSections, setExpandedSections] = useState({
    basicInfo: true,
    location: true,
    media: true,
    people: true,
    categories: true,
    documents: true,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      requestName: "",
      notes: "",
      location: "",
      city: "",
      date: new Date(),
      weather: "",
      approver: null,
      nearbyLocation: null,
    },
  });

  const nearbyLocations = [
    { label: "Địa điểm 1", value: "1" },
    { label: "Địa điểm 2", value: "2" },
    { label: "Địa điểm 3", value: "3" },
  ];

  const approversList = [
    { label: "Nguyễn Văn A", value: "1" },
    { label: "Trần Thị B", value: "2" },
    { label: "Lê Văn C", value: "3" },
  ];

  // Calculate completion progress
  const totalFields = 7; // Total number of main fields
  const completedFields = Object.keys(dirtyFields).length;
  const progressPercent = Math.round((completedFields / totalFields) * 100);

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
  };

  // For rendering section headers without toggle
  const SectionHeader = ({ title, section, icon }) => (
    <Surface style={styles.sectionHeader} elevation={1}>
      <View style={styles.sectionHeaderContent}>
        <Avatar.Icon
          size={36}
          icon={icon}
          style={{ backgroundColor: theme.colors.primaryContainer }}
          color={theme.colors.primary}
        />
        <Text style={styles.sectionHeaderText}>{title}</Text>
      </View>
    </Surface>
  );

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScreenHeader
          title="Thông tin yêu cầu nghiệm thu"
          onBackPress={() => navigation.goBack()}
          onOpenMenuPress={() => {}}
          showBackButton
          rightIcon="more-vertical"
        />

        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progressPercent}%`,
                  backgroundColor: theme.colors.primary,
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>{progressPercent}% hoàn thành</Text>
        </View>

        <ScrollView style={styles.formContainer}>
          {/* Status section */}
          <Card style={styles.statusCard}>
            <Card.Content>
              <View style={styles.statusRow}>
                <Text style={styles.statusLabel}>Trạng thái:</Text>
                <Chip
                  mode="outlined"
                  style={styles.statusChip}
                  textStyle={{ color: theme.colors.primary }}
                >
                  Đang xử lý
                </Chip>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Người thay đổi:</Text>
                <Text style={styles.value}>thuongdev</Text>
              </View>
            </Card.Content>
          </Card>

          {/* Basic Information Section */}
          <SectionHeader
            title="Thông tin cơ bản"
            section="basicInfo"
            icon="information-outline"
          />

          {expandedSections.basicInfo && (
            <Animatable.View
              animation="fadeIn"
              duration={400}
              style={styles.sectionContent}
            >
              {/* Tên yêu cầu */}
              <Controller
                control={control}
                name="requestName"
                rules={{ required: "Tên yêu cầu không được để trống" }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    label="Tên yêu cầu nghiệm thu *"
                    mode="outlined"
                    value={value}
                    onChangeText={onChange}
                    error={!!errors.requestName}
                    left={<TextInput.Icon icon="format-title" />}
                    style={styles.input}
                  />
                )}
              />
              {errors.requestName && (
                <HelperText type="error" visible={!!errors.requestName}>
                  {errors.requestName?.message}
                </HelperText>
              )}

              {/* Ghi chú */}
              <Controller
                control={control}
                name="notes"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    label="Ghi chú"
                    mode="outlined"
                    value={value}
                    onChangeText={onChange}
                    multiline
                    numberOfLines={4}
                    left={<TextInput.Icon icon="note-text-outline" />}
                    style={styles.input}
                  />
                )}
              />

              {/* Thời gian */}
              <Controller
                control={control}
                name="date"
                render={({ field: { onChange, value } }) => (
                  <DatePickerInput
                    locale="vi"
                    label="Thời gian"
                    value={value}
                    onChange={onChange}
                    inputMode="start"
                    style={styles.dateInput}
                    mode="outlined"
                    placeholderText="Chọn ngày giờ"
                    presentationStyle="pageSheet"
                    left={<TextInput.Icon icon="calendar" />}
                  />
                )}
              />
            </Animatable.View>
          )}

          {/* Location Section */}
          <SectionHeader
            title="Địa điểm"
            section="location"
            icon="map-marker"
          />

          {expandedSections.location && (
            <Animatable.View
              animation="fadeIn"
              duration={400}
              style={styles.sectionContent}
            >
              {/* Địa điểm */}
              <Controller
                control={control}
                name="location"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    label="Địa điểm"
                    mode="outlined"
                    value={value}
                    onChangeText={onChange}
                    left={<TextInput.Icon icon="map-marker" />}
                    style={styles.input}
                  />
                )}
              />

              {/* Địa điểm gần */}
              <Text style={styles.dropdownLabel}>Vị trí gần đây</Text>
              <Controller
                control={control}
                name="nearbyLocation"
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.dropdownPlaceholder}
                    selectedTextStyle={styles.dropdownSelectedText}
                    placeholder="Chọn địa điểm gần đây"
                    data={nearbyLocations}
                    labelField="label"
                    valueField="value"
                    value={value}
                    onChange={(item) => onChange(item.value)}
                    renderLeftIcon={() => (
                      <Icon
                        name="place"
                        size={20}
                        color={theme.colors.primary}
                        style={styles.dropdownIcon}
                      />
                    )}
                  />
                )}
              />

              {/* Thành phố */}
              <Controller
                control={control}
                name="city"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    label="Thành phố"
                    mode="outlined"
                    value={value}
                    onChangeText={onChange}
                    left={<TextInput.Icon icon="city" />}
                    style={styles.input}
                  />
                )}
              />

              {/* Tọa độ */}
              <Surface style={styles.coordinatesContainer} elevation={1}>
                <Icon name="gps-fixed" size={20} color={theme.colors.primary} />
                <Text style={styles.coordinates}>
                  {location.latitude.toFixed(6)},{" "}
                  {location.longitude.toFixed(6)}
                </Text>
              </Surface>

              {/* Thời tiết */}
              <Controller
                control={control}
                name="weather"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    label="Thời tiết"
                    mode="outlined"
                    value={value}
                    onChangeText={onChange}
                    left={<TextInput.Icon icon="weather-partly-cloudy" />}
                    style={styles.input}
                  />
                )}
              />
            </Animatable.View>
          )}

          {/* Media Section */}
          <SectionHeader
            title="Hình ảnh & Media"
            section="media"
            icon="image"
          />

          {expandedSections.media && (
            <Animatable.View
              animation="fadeIn"
              duration={400}
              style={styles.sectionContent}
            >
              <ImagePickerComponent />
            </Animatable.View>
          )}

          {/* People Section */}
          <SectionHeader
            title="Người phê duyệt"
            section="people"
            icon="account-multiple"
          />

          {expandedSections.people && (
            <Animatable.View
              animation="fadeIn"
              duration={400}
              style={styles.sectionContent}
            >
              <Text style={styles.dropdownLabel}>
                Người trưởng nhóm / Người phê duyệt
              </Text>
              <Controller
                control={control}
                name="approver"
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.dropdownPlaceholder}
                    selectedTextStyle={styles.dropdownSelectedText}
                    placeholder="Chọn người phê duyệt"
                    data={approversList}
                    labelField="label"
                    valueField="value"
                    value={value}
                    onChange={(item) => onChange(item.value)}
                    renderLeftIcon={() => (
                      <Icon
                        name="person"
                        size={20}
                        color={theme.colors.primary}
                        style={styles.dropdownIcon}
                      />
                    )}
                  />
                )}
              />
            </Animatable.View>
          )}

          {/* Categories Section */}
          <SectionHeader
            title="Danh mục nghiệm thu"
            section="categories"
            icon="format-list-bulleted"
          />

          {expandedSections.categories && (
            <Animatable.View
              animation="fadeIn"
              duration={400}
              style={styles.sectionContent}
            >
              <CategoryAcceptance />
            </Animatable.View>
          )}

          {/* Documents Section */}
          <SectionHeader
            title="Tài liệu đính kèm"
            section="documents"
            icon="file-document-multiple"
          />

          {expandedSections.documents && (
            <Animatable.View
              animation="fadeIn"
              duration={400}
              style={styles.sectionContent}
            >
              <DocumentPickerComponent />
            </Animatable.View>
          )}

          {/* Submit Button */}
          {/* <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            style={styles.submitButton}
            contentStyle={styles.submitButtonContent}
            icon="check-circle"
          >
            Gửi yêu cầu nghiệm thu
          </Button> */}
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  progressContainer: {
    padding: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    textAlign: "right",
    marginTop: 4,
    fontSize: 12,
    color: "#666",
  },
  statusCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginRight: 8,
  },
  statusChip: {
    borderRadius: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginRight: 8,
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 8,
  },
  sectionHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,
  },
  sectionContent: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 8,
  },
  input: {
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  dateInput: {
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  dropdownLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
    fontWeight: "500",
  },
  dropdown: {
    height: 56,
    backgroundColor: "#fff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#bdbdbd",
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  dropdownPlaceholder: {
    color: "#9e9e9e",
    fontSize: 16,
  },
  dropdownSelectedText: {
    color: "#333",
    fontSize: 16,
    marginLeft: 8,
  },
  dropdownIcon: {
    marginRight: 8,
  },
  coordinatesContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f7f7f7",
    borderRadius: 8,
    marginBottom: 16,
  },
  coordinates: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  submitButton: {
    marginVertical: 24,
    borderRadius: 8,
  },
  submitButtonContent: {
    paddingVertical: 8,
  },
});
