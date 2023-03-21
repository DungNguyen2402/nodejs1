import dotenv from "dotenv";
import joi from "joi";
import product from "../models/product";
import products from "../models/product";

dotenv.config();
const productSchema = joi.schema({
    name: joi.string().required(),
    price: joi.number().required(),
    description: joi.string().required(),
})

export const getAll = async (req, res) => {
    try {
        const product = await products.find();
        if (product.length === 0) {
            return res.status(404).json({ 
                message: "Khong tim thay san pham nao"
            })
        }
        return res.json({
            message: "Lay san pham thanh cong"
        })
            
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const product = await products.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: "Khong tim thay san pham"
            });
        }
        return res.json({
            message: "Lay san pham thanh cong"
        });
        
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }

}

export const create = async (req, res) => {

    // validate
    const {error} = productSchema.validate(req.body) 
    if (error) {
        return res.status(400).json({
            message: error.detail[0].message
        })
    }
    try {
        const product = await products.create(req.body);
        if (!product) {
            return res.json({
                message: "Them san pham that bai"
            })
        }
        return res.json({
            message: "Them san pham thanh cong",
            product,
        })
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

export const remove = async (req, res) => {
    try {
        const product = await products.findByIdAndDelete(req.params.id)
        return res.json({
            message: "Xóa sản phẩm thành công",
            product,
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }

}


export const update = async (req, res) => {
    try {
        const product = await products.findOneAndUpdate({ _id:req.params.id} , req.body , {
            new: true
        });
        if (!product) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm"
            })
        }
        return res.json({
            message : "Cập nhật thành công"
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }

}