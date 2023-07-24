import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { setUser } from "./store/features/User";
import api from "./axios";
import Alert from "./components/Alert";

const ProtectedRoute = ({ perfilNecessario, children }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.login.isAuthenticated);
    const perfilUsuario = useSelector((state) => state.user.user);
    const [isLoading, setIsLoading] = useState(true);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [redirectToHome, setRedirectToHome] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            console.log('getUser')
            const options = {
                url: `/auth/me`,
                method: "POST",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    Authorization: token ? `Bearer ${token}` : "",
                },
            };
            return await api(options)
                .then((response) => {
                    dispatch(setUser(response.data));
                    setIsLoading(false)
                })
                .catch((error) => {
                    console.error("Erro ao buscar o usuário:", error.response);
                    setIsLoading(false)
                });
        };

        getUser();
    }, [dispatch, token]);


    // Verifica se ainda está carregando os dados do usuário
    if(!perfilUsuario ){
        if (isLoading) {
            return null
        }
    }

    // Depois que a requisição for concluída e o perfil do usuário estiver disponível
    // Você pode verificar se o perfil é válido para renderizar a rota protegida ou redirecionar para outra página.
    if (!perfilUsuario || !perfilNecessario.includes(perfilUsuario.co_perfil)) {

        if (!openAlert) {
            setOpenAlert(true);
            // Após 2 segundos, define o estado para não mostrar o alerta e realiza o redirecionamento
            setTimeout(() => {
                setOpenAlert(false);
                setRedirectToHome(true);
            }, 3000);
        }

        return (
            <div>
                <Alert open={openAlert} type={'warning'} setOpenAlert={setOpenAlert} messageAlert={'Usuário sem permissão para acesso'} />
                {redirectToHome && <Navigate to="/" replace />}
            </div>
        )
    }

    // Caso o perfil do usuário seja válido, renderize a rota protegida ou o componente filho passado como prop.
    return children ? children : <Outlet />;
};

export default ProtectedRoute;
