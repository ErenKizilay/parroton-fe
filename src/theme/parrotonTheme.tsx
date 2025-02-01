// Define developer-focused theme props
const parrotonTheme = {
    token: {
      // Developer-friendly color palette
      colorPrimary: '#217ba0', // Professional blue
      colorSuccess: '#4caf50', // Green for positive actions
      colorError: '#e53935', // Red for errors
      colorWarning: '#ffb300', // Amber for warnings
      colorInfo: '#217ba0', // Matching primary color
  
      // Typography and readability
      fontFamily: "'Source Sans Pro', 'Consolas', 'Courier New', monospace",
      fontSizeBase: 14, // Slightly smaller for dense content
      lineHeightBase: 1.6,
      colorTextBase: '#1f2933', // High-contrast dark gray
      colorTextSecondary: '#4b5563', // Muted secondary text
  
      // Backgrounds for focus
      colorBgBase: '#f8f9fa', // Light gray for contrast
      colorBgContainer: '#ffffff', // Neutral container background
      colorLink: '#217ba0',
      colorLinkHover: '#1a5a78',
  
      // Borders and radius
      borderRadius: 4, // Compact and technical feel
    },
    components: {
      Button: {
        borderRadius: 4, // Technical and sharp
        fontWeight: 600, // Bold buttons for emphasis
      },
      Card: {
        borderRadius: 6,
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
      },
      Layout: {
        headerHeight: 60,
        colorBgHeader: '#1e293b', // Dark blue header for focus
        colorTextHeader: '#ffffff',
      },
      Table: {
        borderColor: '#d1d5db', // Subtle borders for tables
        colorBgContainer: '#ffffff',
        colorTextHeader: '#1f2933', // High contrast header text
        colorTextBody: '#4b5563',
      },
    },
  };

  export default parrotonTheme;