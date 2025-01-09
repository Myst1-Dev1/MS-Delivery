import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/services/schema";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        const { name, email, password } = await req.json();

        await connectToDatabase();

        const emailExists = await User.findOne({email});

        if(emailExists) {
            return NextResponse.json({
                message: "E-mail já cadastrado",
                status:409,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            restaurant: [],
        });

        await newUser.save();

        return NextResponse.json({
            message: "Usuário criado com sucesso.",
            status:201,
        });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Erro ao cadastrar o usuário.",
            status:500,
        });
    }
}