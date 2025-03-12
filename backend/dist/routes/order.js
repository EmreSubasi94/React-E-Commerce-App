"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
const router = _express2.default.Router();

var _order = require('../controllers/order'); var _order2 = _interopRequireDefault(_order);

router.post("/", _order2.default.Create);
router.get("/", _order2.default.List);
router.get("/my-orders", _order2.default.GetMyOrders);
router.delete("/:order_id", _order2.default.Delete); // Silme işlemi için yeni endpoint eklendi

exports. default = router;
