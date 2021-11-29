import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
} from 'amazon-cognito-identity-js';
import { useEffect, useState } from 'react';

const poolData = {
    UserPoolId: 'us-west-1_Y80GF2l76',
    ClientId: '8joaoqopt725b1t0773g5ff6n'
};

const userPool = new CognitoUserPool(poolData);


export const useAuth = () => {
    const [cognitoUser, setCognitoUser] = useState<any>({})
    const [user, setUser] = useState<any>({})

    useEffect(() => {
        setUser(userPool.getCurrentUser())
    }, [])

    const signUp = async ({ email, password }: any) => {
        var attributeEmail = new CognitoUserAttribute({
            Name: 'email',
            Value: email,
        });

        userPool.signUp(email, password, [attributeEmail], [], function (
            err,
            result
        ) {
            if (err) {
                console.log(err.message);
                return;
            }
            setCognitoUser(result?.user)
            console.log('Successful: user name is ' + cognitoUser.getEmail());
        });
    }


    const verifyUser = (code: string) => {
        if (cognitoUser) {

            cognitoUser.confirmRegistration(code, true, function (err: any, result: any) {
                if (err) {
                    alert(err.message || JSON.stringify(err));
                    return;
                }
                console.log('Success:' + result);
            });
        }
    }

    return { user, cognitoUser, signUp, verifyUser }

}