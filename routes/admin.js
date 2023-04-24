const express=require("express");

const path=require("path");

// path of controller file
const adminCont=require("");

const router=express.Router();

router.get("/admin-listings")