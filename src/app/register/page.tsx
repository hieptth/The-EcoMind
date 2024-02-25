"use client";
import React, { FormEvent } from 'react';
import styles from './registerPage.module.css'; 
import Image from 'next/image';

const registerPage: React.FC = () => {
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
    };

    return (
        <div className={styles.container}>
            <div className={styles.leftPane}>
                <Image
                    src="/login-image.png"
                    alt="Login Image"
                    width={500}
                    height={500}
                />
            </div>
            <div className={styles.rightPane}>
                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    <Image
                        src="/logo.png"
                        alt="Login Logo"
                        width={100}
                        height={100}
                    />
                    <h1>Welcome to EcoMind</h1>
                    <p style={{color:'#737d8c'}}>Welcome back! login with your data that you entered during registration.</p>
                    <label htmlFor="email" className={styles.formLabel}>Email Address</label>
                    <input type="email" placeholder="Email" />
                    
                    <label htmlFor="password" className={styles.formLabel}>Password</label>
                    <input type="password" placeholder="Password" />
                    
                    <label htmlFor="Phone number" className={styles.formLabel}>Phone number</label>
                    <input type="Phone number" placeholder="Phone number" />

                    <button type="submit">Register</button>
                    <div
                    style={{display: 'flex', flexDirection: 'row', alignItems: 'center',padding:'10px'}}
                    >
                    <div style={{flex: 1, height: '1px', backgroundColor: 'black'}} />
                    <div>
                        <p style={{width: '70px', textAlign: 'center'}}>Or</p>
                    </div>

                    <div style={{flex: 1, height: '1px', backgroundColor: 'black'}} />
                    </div>

                    <button type="submit">Return to log in page</button>
                </form>
            </div>
        </div>
    );
};

export default registerPage;
