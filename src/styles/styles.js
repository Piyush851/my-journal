import { StyleSheet } from "react-native";

export default StyleSheet.create({

    /* =======================================
       GLOBAL LAYOUT
    ======================================= */
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
        paddingHorizontal: 20,
        paddingTop: 20,
    },

    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    /* =======================================
       AUTH SCREENS
    ======================================= */
    authContainer: {
        flex: 1,
    },

    headerSection: {
        alignItems: "center",
        marginBottom: 40,
    },

    logo: {
        fontSize: 50,
        marginBottom: 10,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#0F172A",
        marginBottom: 4,
    },

    subtitle: {
        fontSize: 15,
        color: "#64748B",
        textAlign: "center",
    },

    formSection: {
        width: "100%",
        marginTop: 10,
    },

    input: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        fontSize: 15,
        color: "#0F172A",
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    primaryButton: {
        backgroundColor: "#2563EB",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },

    primaryButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },

    secondaryButton: {
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: "#F1F5F9",
        alignItems: "center",
        marginTop: 10,
    },

    secondaryButtonText: {
        color: "#0F172A",
        fontSize: 16,
        fontWeight: "500",
    },

    linkButton: {
        marginTop: 14,
        alignItems: "center",
    },

    linkButtonText: {
        color: "#2563EB",
        fontSize: 15,
        fontWeight: "500",
    },

    /* =======================================
       HEADER BAR
    ======================================= */
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },

    headerTitle: {
        fontSize: 26,
        fontWeight: "700",
        color: "#0F172A",
    },

    headerSubtitle: {
        fontSize: 15,
        color: "#64748B",
    },

    logoutButton: {
        backgroundColor: "#FEE2E2",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 10,
    },

    logoutButtonText: {
        color: "#B91C1C",
        fontSize: 14,
        fontWeight: "600",
    },

    /* =======================================
       ENTRY LIST SCREEN
    ======================================= */
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },

    statCard: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        marginRight: 12,
        paddingVertical: 14,
        borderRadius: 16,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    statNumber: {
        fontSize: 20,
        fontWeight: "700",
        color: "#0F172A",
    },

    statLabel: {
        fontSize: 13,
        color: "#64748B",
        marginTop: 4,
    },

    entriesList: {
        flex: 1,
    },

    entryCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    entryHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },

    entryMood: {
        fontSize: 24,
    },

    entryDate: {
        fontSize: 13,
        color: "#64748B",
    },

    entryTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0F172A",
        marginBottom: 4,
    },

    entryContent: {
        fontSize: 14,
        color: "#475569",
    },

    /* =======================================
       EMPTY STATE
    ======================================= */
    emptyState: {
        marginTop: 60,
        alignItems: "center",
    },

    emptyEmoji: {
        fontSize: 60,
        marginBottom: 10,
    },

    emptyText: {
        fontSize: 20,
        fontWeight: "700",
        color: "#0F172A",
        marginBottom: 4,
    },

    emptySubtext: {
        fontSize: 14,
        color: "#64748B",
        textAlign: "center",
        maxWidth: 240,
    },

    /* =======================================
       ADD/EDIT ENTRY MODAL
    ======================================= */
    modalContainer: {
        flex: 1,
        backgroundColor: "#F8FAFC",
    },

    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },

    modalButton: {
        fontSize: 16,
        color: "#2563EB",
        fontWeight: "600",
    },

    modalSaveButton: {
        fontWeight: "700",
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0F172A",
    },

    modalContent: {
        padding: 20,
    },

    label: {
        fontSize: 15,
        fontWeight: "600",
        color: "#334155",
        marginBottom: 6,
    },

    moodSelector: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },

    moodOption: {
        alignItems: "center",
        padding: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        backgroundColor: "#FFFFFF",
        flex: 1,
        marginHorizontal: 4,
    },

    moodOptionSelected: {
        backgroundColor: "#DBEAFE",
        borderColor: "#2563EB",
    },

    moodEmoji: {
        fontSize: 26,
    },

    moodLabel: {
        fontSize: 13,
        marginTop: 4,
        color: "#475569",
    },

    titleInput: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        color: "#0F172A",
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    contentInput: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 14,
        fontSize: 15,
        height: 180,
        color: "#0F172A",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginBottom: 20,
    },

    deleteButton: {
        backgroundColor: "#FEE2E2",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },

    deleteButtonText: {
        color: "#B91C1C",
        fontSize: 16,
        fontWeight: "600",
    },

    /* =======================================
       Floating Add Button
    ======================================= */
    fab: {
        position: "absolute",
        right: 20,
        bottom: 30,
        backgroundColor: "#2563EB",
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
    },

    fabIcon: {
        color: "#FFFFFF",
        fontSize: 30,
        lineHeight: 30,
    },
    /* Custom headers (Option B) */

    customHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },

    homeTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "#0F172A",
    },

    homeSubtitle: {
        fontSize: 14,
        color: "#64748B",
        marginTop: 2,
    },

    logoutChip: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        backgroundColor: "#FEE2E2",
        borderRadius: 12,
    },

    logoutChipText: {
        color: "#B91C1C",
        fontSize: 14,
        fontWeight: "600",
    },

    /* Add/Edit Screen Header */
    editorHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },

    headerBack: {
        fontSize: 16,
        color: "#2563EB",
        fontWeight: "600",
    },

    headerTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: "#0F172A",
    },

    headerSave: {
        fontSize: 16,
        color: "#2563EB",
        fontWeight: "700",
    },

    /* Screen titles for Login/Signup */
    screenTitle: {
        fontSize: 26,
        fontWeight: "700",
        color: "#0F172A",
        textAlign: "center",
        marginBottom: 6,
    },

    screenSubtitle: {
        fontSize: 15,
        color: "#64748B",
        textAlign: "center",
        marginBottom: 30,
    },
    /* Search bar */
    searchBar: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 15,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginBottom: 14,
    },

    /* Filter row */
    filterRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 12,
    },

    filterChip: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        backgroundColor: "#F1F5F9",
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    filterChipSelected: {
        backgroundColor: "#DBEAFE",
        borderColor: "#2563EB",
    },

    filterChipText: {
        color: "#334155",
        fontSize: 14,
    },

    filterChipSelectedText: {
        color: "#1E40AF",
        fontWeight: "600",
    },

    /* Sort buttons */
    sortRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },

    sortButton: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 14,
        backgroundColor: "#F1F5F9",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    sortButtonSelected: {
        backgroundColor: "#DBEAFE",
        borderColor: "#2563EB",
    },

    sortText: {
        fontSize: 14,
        color: "#334155",
    },

    sortTextSelected: {
        color: "#1E40AF",
        fontWeight: "600",
    },


});
