import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import LoginImage from '../../assets/Logo.png';
import './../../index.css';
import UserLogin from '../../models/UserLogin';
import { AuthContext } from '../../contexts/AuthContext';
import { ArrowCircleRight } from '@phosphor-icons/react';

function Login() {
  const navigate = useNavigate();

  const [loginCredentials, setLoginCredentials] = useState<UserLogin>(
    {} as UserLogin,
  );

  const { user, handleLogin, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (user?.token) {
      navigate('/home');
    }
  }, [user, navigate]);

  function updateState(e: ChangeEvent<HTMLInputElement>) {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
  }

  function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(loginCredentials);
  }

  return (
    <>
      <div className="bg-seasalt">
        <section className="bg-seasalt grid justify-items-center font-bold p-32">
          <article className="grid bg-seasalt grid-cols-3 rounded-[30px] shadow-2xl w-3/6">
            <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-t from-[#070d17] via-[#070d17] to-[#04080f] rounded-s-[30px] p-6">
              <img
                src={LoginImage}
                className="items-centerw-40 h-40"
                alt="Cadastro"
              />
            </div>

            <form
              className="col-span-2 flex flex-col gap-4 p-10 rounded-e-[30px]"
              onSubmit={login}
            >
              <div className="w-full">
                <h4 className="">Entrar</h4>
                <div className="flex flex-col w-full py-4 input-login">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="border border-davysGray rounded-lg p-3 h-14 text-darkMossGreen"
                    value={loginCredentials.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      updateState(e)
                    }
                  />
                </div>
                <div className="flex flex-col w-full py-4 input-login">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Senha"
                    className="border border-davysGray rounded-lg p-3 h-14 text-darkMossGreen"
                    value={loginCredentials.password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      updateState(e)
                    }
                  />
                </div>
              </div>

              <p className="paragraph">
                Ainda não tem uma conta?
                <Link
                  to="/register"
                  className="text-emerald font-bold hover:underline ml-1"
                >
                  Cadastre-se
                </Link>
              </p>
              <button
                type="submit"
                className="rounded-[10px] bg-darkMossGreen border border-darkMossGreen 
              text-white w-2/6 h-[60px] p-4 flex justify-center items-center 
              transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-10 
              duration-50 shadow-lg"
              >
                {isLoading ? (
                  <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="24"
                    visible={true}
                  />
                ) : (
                  <span className="flex">
                    Entrar
                    <span className="ml-2 flex items-center">
                      <ArrowCircleRight
                        size={18}
                        color="#f7f7f7"
                        weight="fill"
                      />
                    </span>
                    {/* <img src={ArrowIcon} alt="Arrow Icon" className="w-4 ms-2" /> */}
                  </span>
                )}
              </button>
            </form>
          </article>
        </section>
      </div>
    </>
  );
}

export default Login;
