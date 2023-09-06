module.exports = {
    signup: (req, res) => {
      res.status(200).json({
        message: "SIGN UP",
      });
    },
    login: (req, res) => {
      res.status(200).json({
        message: "LOG IN",
      });
    },
  };
  