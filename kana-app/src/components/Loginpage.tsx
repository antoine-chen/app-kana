import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "../css/LoginPage.css";

const loginSchema = z.object({
    email: z
        .string()
        .min(1, "L'email est requis")
        .email("Email invalide"),
    password: z
        .string()
        .min(1, "Le mot de passe est requis")
        .min(6, "6 caractères minimum"),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    function onSubmit(data: LoginFormData) {
        console.log(data);
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <span className="login-jp">ログイン</span>
                    <h1>Connexion</h1>
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

                    <button type="submit" className="login-btn" disabled={isSubmitting}>
                        {isSubmitting ? "Connexion..." : "Se connecter"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;