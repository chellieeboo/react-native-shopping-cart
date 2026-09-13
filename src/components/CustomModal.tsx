import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../app/context/ThemeContext";

type CustomModalProps = {
  visible: boolean;
  title: string;
  message: string;
  type?: "alert" | "confirm";
  onConfirm: () => void;
  onCancel?: () => void;
};

export default function CustomModal({
  visible,
  title,
  message,
  type = "alert",
  onConfirm,
  onCancel,
}: CustomModalProps) {
  const { colors } = useTheme();

  if (!visible) return null;

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={[styles.modalCard, { backgroundColor: colors.cardBg }]}>
          <Text style={[styles.title, { color: colors.textLight }]}>
            {title}
          </Text>
          <Text style={[styles.message, { color: colors.textMuted }]}>
            {message}
          </Text>

          <View style={styles.buttonRow}>
            {type === "confirm" && (
              <TouchableOpacity
                style={[styles.btn, styles.cancelBtn]}
                onPress={onCancel}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[
                styles.btn,
                { backgroundColor: colors.accent },
                type === "alert" ? { flex: 1 } : {},
              ]}
              onPress={onConfirm}
            >
              <Text style={[styles.confirmText, { color: colors.textDark }]}>
                {type === "confirm" ? "Confirm" : "OK"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalCard: {
    width: "100%",
    maxWidth: 380,
    borderRadius: 20,
    padding: 22,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelBtn: {
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  cancelText: {
    color: "#E5E5E5",
    fontWeight: "600",
  },
  confirmText: {
    fontWeight: "700",
  },
});
