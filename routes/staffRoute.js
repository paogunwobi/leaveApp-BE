const staffCtrl = require("../controllers/staffCtrl");
const router = require("express").Router();

router.post("/", staffCtrl.sendSignForm);

router.patch("/update/:id", staffCtrl.updatestaff);

router.patch("/reset_password", staffCtrl.ResetPassword);

router.patch("/change_password/", staffCtrl.changePassword);

router.get("/department/:id", staffCtrl.getAllstaffs4Department);

router.get("/:id", staffCtrl.getOnestaff);

router.delete("/:id", staffCtrl.deleteOnestaff);

router.delete("/", staffCtrl.deleteAllstaffs);

router.post("/login", staffCtrl.staffLogin);

router.get("/all", staffCtrl.getAllstaffs);

router.post("/forgot_password", staffCtrl.forgotPassword);

router.post("/add-staff", staffCtrl.addOnestaff);

router.get("/all/profile", staffCtrl.getstaffProfile);

module.exports = router;
