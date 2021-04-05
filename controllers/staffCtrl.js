const db = require("../database/models");
const bcrypt = require("bcryptjs");

exports.addOnestaff = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      staffLevelId,
      departmentId,
      role,
      password,
      } = req.body;

    //checks if the email already exists
    const staff = await db.staff.findOne({
      where: { email: email },
    });

    //returns an error message if email exists
    if (staff) {
      return res
        .status(400)
        .json({ success: false, message: "staff Already Exist" });
    }

    //hashes password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newstaff = await db.staff.create({
        firstName,
        lastName,
        email,
        staffLevelId,
        departmentId,
        role,
        password: hashedPassword
    });

    if (newstaff) {
      const department = await db.department.findOne({
        where: {
          id: newstaff.departmentId,
        },
      });

      // send notification to line manager
      const payLoad = {
        receiverId: [department.lineManagerId],
        notifyId: newstaff.id,
        title: "staff Created",
        role: role,
        body: ` Take a look! ${newstaff.firstName} ${newstaff.lastName} Account has been created`,
      };

      console.log(payLoad)      // Send RealTime Notifications
    //   pusher("newstaff", payLoad, req.headers["x-socket-id"]);

      return res.status(201).json({
        success: true,
        message: "Success",
        data: newstaff,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

exports.updatestaff = async (req, res) => {
  try {
    const { id } = req.params;

    const staff = await db.staff.findOne({
      where: { id },
    });

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "staff Not Found",
      });
    }

    const formData = {
      title: req.body.title,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      role: req.body.role,
      departmentId: req.body.departmentId,
      staffLevelId: req.body.staffLevelId,
    };

    await staff.update(formData);

    return res.status(200).json({
      success: true,
      message: "Success",
      data: staff,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

//staff login
exports.staffLogin = async (req, res) => {
  try {

    const { staffCode, password } = req.body;

    // Query the db for where the user email exists
    const staff = await db.staff.findOne({
      where: { staffCode },
      exclude: ["password"],
      include: [
        "department",
        "staffLevel",
      ],
    });

    //If user email does not exist
    if (!staff) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect Email or Password" });
    }

    // check if users password matches the password on the db
    const match = bcrypt.compareSync(password, staff.password);
    if (!match) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect Email or Password" });
    }

    const payload = {
      id: staff.id,
      name: `${staff.firstName} ${staff.lastName}`,
      email: staff.email,
      role: staff.role,
      departmentId: staff.departmentId,
      staffLevelId: staff.staffLevelId
    };

    const token = createToken(payload, "2d");

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: staff,
      token,
    });
  } catch (err) {
    console.log(err);
    //logger.error(`message - ${ex.message}, stack trace - ${ex.stack}`);
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.sendSignForm = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const exist = await db.staff.findOne({
      where: { email: req.body.email.toLowerCase() },
    });

    if (exist) {
      return res
        .status(200)
        .json({ success: false, message: "Account already exist " });
    }

    req.body.email = req.body.email.toLowerCase();

    await db.staff.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Staff Successfully Created",
      data: req.body,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

//get all staff
exports.getAllstaffs = async (req, res) => {
  res.send("getAllstaffs endpoint works!!!");
  // try {
  //   console.log('Looking for Staffs already...');
  //   const staffs = await db.staff.findAll({
  //     include: ["department"],
  //     attributes: { exclude: ["password"] },
  //   });

  //   if (staffs) {
  //     return res.status(200).json({ success: true, data: staffs });
  //   }
  //   return res
  //     .status(404)
  //     .json({ success: false, message: "No staff found" });
  // } catch (err) {
  //   console.log(err);
  //   return res.status(500).json({ success: false, error: error.message });
  // }
};

//get all staff for a Department
exports.getAllstaffs4Department = async (req, res) => {
  try {
    const { id } = req.params;
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    const staffs = await db.staff.findAll({
      limit,
      offset,
      where: { departmentId: id },
      include: ["info", "department"],
      attributes: { exclude: ["password"] },
    });

    if (staffs) {
      return res.status(200).json({ success: true, data: staffs });
    }

    return res
      .status(400)
      .json({ success: false, message: "No staff found" });
  } catch (error) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

//gets a particular staff
exports.getOnestaff = async (req, res) => {
  try {
    const staff = await db.staff.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ["password"] },
      include: [
        "department",
        "staffLevel"
      ],
    });

    if (staff) {
      return res.status(200).json({ success: true, data: staff });
    }

    return res
      .status(404)
      .json({ success: false, message: "staff not found" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

//deletes one staff
exports.deleteOnestaff = async (req, res) => {
  try {
    //checks if company exists
    const staff = await db.staff.findOne({
      where: { id: req.params.id },
    });

    //deletes company if it exist
    if (staff) {
      await staff.destroy();
      return res
        .status(200)
        .json({ success: true, message: "staff deleted!" });
    }
    //sends an error message if it doesn't exist
    return res
      .status(404)
      .json({ success: true, message: "staff not found" });
  } catch (error) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

//delete all staff
exports.deleteAllstaffs = async (req, res) => {
  try {
    await db.staff.destroy({
      where: {},
      truncate: true,
    });
    return res
      .status(200)
      .json({ success: true, message: "All staff record deleted!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// multiple delete 
exports.multipleDelete = async (req, res) => {
  try {
    if (!req.body.id) {
      return res
        .status(400)
        .json({ success: false, message: "Id is required" });
    }

    //checks if leaveType exist
    const deleted = await db.staff.destroy({
      where: {
        id: req.body.id,
        companyId: req.user.companyId,
      },
    });

    //deletes staff if it exist
    if (deleted) {
      return res.status(200).json({ success: true, message: "Success" });
    }

    //sends an error message if it doesn't exist
    return res.status(200).json({ success: false, message: "Data Not found" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};


//staff Forgot Password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const staff = await db.staff.findOne({
      where: { email },
    });
    if (!staff) {
        // sendMail Someone is trying to Login
      return res.status(400).json({
        success: false,
        message: "if this email exist a mail will be sent to it",
      });
    } else if (staff) {
      //reset password to a default sendMail with default password, on login prompt change password
      return res.status(200).json({
        success: true,
        message: "if this email exist a mail will be sent to it",
      });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// staff Reset Password
exports.ResetPassword = async (req, res) => {
  try {
    const { email } = req.params;
      // Find the user in the db where email exists
      const staff = await db.staff.findOne({
        where: { email },
      });

      if (staff) {
        // Get the the password the user entered
        const { password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
          return res
            .status(400)
            .json({ success: false, message: "Passwords do not match" });
        } else {
          // Hash the password
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const formData = {
            password: hashedPassword,
          };
          // Change password on db
          await staff.update(formData, { where: { email } });

          return res.status(200).json({
            success: true,
            message: "Password updated Successfully",
          });
        }
      }
  } catch (err) {
    return res.status(500).json({ success: false, err: err.message });
  }
};

//change password this needs to be reviewed and refactored
exports.changePassword = async (req, res) => {
  try {
    const { id } = req.user;
    const { oldPassword, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }
    const staff = await db.staff.findOne({ where: { id } });

    if (!staff) {
      return res
        .status(400)
        .send({ success: true, message: "staff does not exist" });
    }

    const match = bcrypt.compareSync(oldPassword, staff.password);
    if (!match) {
      return res
        .status(400)
        .json({ success: false, message: "Password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const formData = {
      password: hashedPassword,
    };
    await staff.update(formData);
    return res.status(200).json({ message: "Password change successful" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// get staff profile
exports.getstaffProfile = async (req, res) => {
  try {
    const { id, staffCode } = req.params;
    const staffProfile = await db.staff.findOne({
      where: { id: id, staffCode: staffCode },
      attributes: {
        exclude: [
          "password",
        ],
      },
    });

    if (staffProfile) {
      return res.status(200).json({
        success: true,
        message: "staff profile returned",
        data: staffProfile,
      });
    }
    return res.status(400).json({
      success: false,
      message: "no record found",
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};


// search staff by department, entity, year and all.
exports.searchstaff = async (req, res) => {
  try {
    const { term, offset, limit } = req.query;
    const { count, rows } = await db.staff.findAndCountAll({
      where: {
        [Op.or]: [
          { departmentName: { [Op.iLike]: `%${term}%` } },
        ],
      },
      order: [["createdAt", "DESC"]],
      offset,
      limit,
    });

    if (count === 0) {
      return res
        .status(200)
        .json({ success: false, message: "No match found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Success", data: { count, rows } });
  }
  catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};