import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { FadeView } from 'react-declarative';

export const FadePage = () => {

    useEffect(() => {
        console.log('ctor')
        return () => {
            console.log('dtor')
        };
    }, []);

    return (
        <>
            <Grid item xs={12}>
                <FadeView disableRight heightRequest={() => 150} widthRequest={() => window.innerWidth - 50}>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
                        Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
                        of Lorem Ipsum.
                    </p>
                </FadeView>
            </Grid>
            <Grid item xs={12}>
                <FadeView disableBottom heightRequest={() => 150} widthRequest={() => window.innerWidth - 50}>
                    <p style={{ whiteSpace: 'nowrap' }}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
                        Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
                        of Lorem Ipsum.
                    </p>
                </FadeView>
            </Grid>
        </>
    );
}

export default FadePage;
