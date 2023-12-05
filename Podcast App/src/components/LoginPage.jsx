import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useState, useEffect } from "react";
import "./LoginPage.css";

function LoginPage() {
    const navigate = useNavigate();
  
    useEffect(() => {
      const authListener = supabase.auth.onAuthStateChange(async (event) => {
        if (event === "SIGNED_IN") {
          navigate("/HomePage");
        } else {
          navigate("/");
        }
      });
  
      return () => {
        authListener.data.onAuthStateChange = null;
      };
    }, [navigate]);
  
    return (
        <div className="center-container">
          <header>
          <img className="podcast-login" src="/podcast.png" />
            <h1 className="welcome-message">Welcome to EchoPods</h1>

            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                style: {
                  button: {
                    color: 'white',
                    fontSize: '14px',
                    margin: 'auto',
                  },
                  anchor: { color: 'white' },
                  input: {
                   
                    margin: 'auto', 
                  },
                },
                variables: {
                  default: {
                    colors: {
                      brand: 'purple',
                      brandAccent: 'darkred',
                    },
                  },
                },
              }}
              theme="dark"
            />
          </header>
        </div>
      );
    }
    
    export default LoginPage;
