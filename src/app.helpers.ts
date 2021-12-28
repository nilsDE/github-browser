/* eslint-disable import/prefer-default-export */

export const extractNextLink = (headerLinks: string) => {
    let newNextLink = '';
    const links = headerLinks.split(', ');
    links.forEach((link: string) => {
        if (link.includes('rel="next"')) {
            newNextLink = link.match(/(&|\?)since=(.*?)(>|&)/)?.[2] || '';
        }
    });
    return newNextLink;
};
