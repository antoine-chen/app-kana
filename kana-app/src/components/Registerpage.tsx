import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "../css/LoginPage.css";

const registerSchema = z.object({
    email: z
        .string()
        .min(1, "L'email est requis")
        .email("Email invalide"),
    password: z
        .string()
        .min(1, "Le mot de passe est requis")
        .min(6, "6 caractères minimum"),
    confirmPassword: z
        .string()
        .min(1, "La confirmation est requise"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    function onSubmit(data: RegisterFormData) {
        console.log(data);
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <span className="login-jp">登録</span>
                    <h1>Inscription</h1>
                </div>

                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-field">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="exemple@mail.com"
                            className={errors.email ? "input-error" : ""}
                            {...register("email")}
                        />
                        {errors.email && (
                            <span className="error-message">{errors.email.message}</span>
                        )}
                    </div>

                    <div className="form-field">
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className={errors.password ? "input-error" : ""}
                            {...register("password")}
                        />
                        {errors.password && (
                            <span className="error-message">{errors.password.message}</span>
                        )}
                    </div>

                    <div className="form-field">
                        <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            className={errors.confirmPassword ? "input-error" : ""}
                            {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && (
                            <span className="error-message">{errors.confirmPassword.message}</span>
                        )}
                    </div>

                    <button type="submit" className="login-btn" disabled={isSubmitting}>
                        {isSubmitting ? "Inscription..." : "S'inscrire"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;