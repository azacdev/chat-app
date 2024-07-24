export const sendMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
