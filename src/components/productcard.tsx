import { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../app/context/ThemeContext";

export default function ProductCard({
  item,
  onAdd,
}: {
  item: any;
  onAdd: any;
}) {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (name.trim() === "") {
      setError("Please enter your name.");
      return;
    }
    if (contact.trim() === "") {
      setError("Please enter your contact number.");
      return;
    }
    if (eventDate.trim() === "") {
      setError("Please enter your preferred event date.");
      return;
    }

    setError("");
    onAdd(item, { name, contact, eventDate });

    setName("");
    setContact("");
    setEventDate("");
    setModalVisible(false);
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.cardBg }]}>
      <Pressable onPress={() => setModalVisible(true)}>
        <Image source={item.image} style={styles.image} />
      </Pressable>

      <Text style={[styles.name, { color: colors.textLight }]}>
        {item.name}
      </Text>
      <Text style={[styles.price, { color: colors.accent }]}>
        ₱{item.price}
      </Text>
      <Text style={[styles.instruments, { color: colors.textMuted }]}>
        {item.instruments.join(" + ")}
      </Text>
      <Text style={[styles.eventTypes, { color: colors.accent }]}>
        Fits: {item.eventTypes.join(", ")}
      </Text>

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: colors.accent }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.addButtonText, { color: colors.textDark }]}>
          Book This Package
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[styles.modalContent, { backgroundColor: colors.cardBg }]}
          >
            <Image source={item.image} style={styles.modalImage} />
            <Text style={[styles.name, { color: colors.textLight }]}>
              {item.name}
            </Text>
            <Text style={[styles.price, { color: colors.accent }]}>
              ₱{item.price}
            </Text>
            <Text style={[styles.description, { color: colors.textMuted }]}>
              {item.description}
            </Text>
            <Text style={[styles.instruments, { color: colors.textMuted }]}>
              Instruments: {item.instruments.join(" + ")}
            </Text>
            <Text style={[styles.eventTypes, { color: colors.accent }]}>
              Best for: {item.eventTypes.join(", ")}
            </Text>

            <TextInput
              placeholder="Your name"
              placeholderTextColor="#B8A896"
              value={name}
              onChangeText={setName}
              style={[
                styles.input,
                { backgroundColor: colors.cardBgLight, color: colors.textDark },
              ]}
            />
            <TextInput
              placeholder="Contact number"
              placeholderTextColor="#B8A896"
              value={contact}
              onChangeText={setContact}
              style={[
                styles.input,
                { backgroundColor: colors.cardBgLight, color: colors.textDark },
              ]}
              keyboardType="phone-pad"
            />
            <TextInput
              placeholder="Preferred event date (MM/DD/YYYY)"
              placeholderTextColor="#B8A896"
              value={eventDate}
              onChangeText={setEventDate}
              style={[
                styles.input,
                { backgroundColor: colors.cardBgLight, color: colors.textDark },
              ]}
            />

            {error !== "" && <Text style={styles.errorText}>{error}</Text>}

            <TouchableOpacity
              style={[
                styles.addButton,
                { backgroundColor: colors.accent, marginTop: 12 },
              ]}
              onPress={handleSubmit}
            >
              <Text style={[styles.addButtonText, { color: colors.textDark }]}>
                Submit Booking Request
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text
                style={[styles.closeButtonText, { color: colors.textMuted }]}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 18,
    margin: 12,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: "cover",
    borderRadius: 14,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
    textAlign: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    textAlign: "center",
    marginBottom: 8,
  },
  instruments: {
    fontSize: 13,
    marginBottom: 4,
  },
  eventTypes: {
    fontSize: 12,
    fontStyle: "italic",
    marginBottom: 10,
    textAlign: "center",
  },
  addButton: {
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 25,
  },
  addButtonText: {
    fontWeight: "700",
    fontSize: 14,
  },
  closeButton: {
    marginTop: 8,
    paddingVertical: 6,
  },
  closeButtonText: {
    fontSize: 13,
    textDecorationLine: "underline",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    padding: 28,
    borderRadius: 20,
    alignItems: "center",
    width: "80%",
  },
  modalImage: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 14,
    marginBottom: 12,
  },
  input: {
    width: "100%",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    fontSize: 14,
  },
  errorText: {
    color: "#FF8A80",
    fontSize: 12,
    marginBottom: 8,
    textAlign: "center",
  },
});
