var User = require('../models/user');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const {body, validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');
const jwt = require('jsonwebtoken');

exports.addUser = [
	body('username').isLength({min:3}).trim().withMessage("Min 3 char"),
	async function (req, res, next){
		const errors = validationResult(req);
		if(!errors.isEmpty()){
			res.json({status:0, data:"validation failed", debug_data:errors.array()});
		}
		else{
			let user = await User.findOne({email: req.body.email});
			if(user){
				return res.status(400).json({msg: "User Already Exist"});
			}
			const salt = await bcrypt.genSalt(10);
			let encryptedPassword = await bcrypt.hash(req.body.password, salt);
			
            var userOb = new User({
				username: req.body.username,
				email: req.body.email,
				password: encryptedPassword
			});
			userOb.save(function(err){
				if(err){
					res.json({status: 0, debug_data:err});
				}
				else{
					res.json({status:1, data:"user saved"});
				}
			})
		}
	}
];
exports.login = [
	body('email').isLength({min:3}).trim().withMessage("Min 3 char"),
	async function (req, res, next){
		const errors = validationResult(req);
		console.log(!errors.isEmpty());

		if(!errors.isEmpty())
		{
			res.json({status:0, data:"validation failed", debug_data:errors.array()})
		}
		else{
			const {email, password} = req.body;
			let user = await User.findOne({email:req.body.email});

			if(!user)
				return res.status(400).json({message:"User not Exist"});

			const passCorrect = await bcrypt.compare(password, user.password);
			if(!passCorrect)
				return res.status(400).json({message:"password wrong!"});

			const payload = {
				user: {
					id: user.id,
					email: email
				}
			};
			jwt.sign(payload, "secretString", {expiresIn:1200}, (err, token)=>{
				if(err) throw err;
				res.status(200).json({token});
			});
		}
	}
];

exports.restrictedPage = [
    auth, async (req, res) =>{
			res.json({company:'Zenrays Technologies'});
		}
];
// exports.restrictedPage = [
//     auth, async (req, res) =>{
// 			res.json({data:'you can access details'});
// 		}
// ];