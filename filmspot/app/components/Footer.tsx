import { memo } from "react";
import { Link } from "react-router";

function Footer(){
    return (
        <footer className="pt-6 bg-[var(--backgroundTransparentSecondary)] z-100 relative border-t border-[var(--borderColorSecondary)]">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-10 xl:px-[40px] mb-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-4">
                    <Link to="/" className="font-medium text-xl md:text-2xl">
                        <span className="font-bold !text-[var(--textAccentColor)]">Film</span>Spot
                    </Link>
                    
                    <nav className="flex flex-wrap gap-4 md:gap-7">
                        <a href="#searchInput" className="button text-sm md:text-base hover:!text-[var(--textAccentColor)] transition-colors">
                            Search
                        </a>
                        <Link to="/about" className="button text-sm md:text-base hover:!text-[var(--textAccentColor)] transition-colors">
                            About
                        </Link>
                        <Link to="/watchlist" className="button text-sm md:text-base hover:!text-[var(--textAccentColor)] transition-colors">
                            Watchlist
                        </Link>
                    </nav>
                </div>

                {/* Description Section */}
                <div className="mt-6 md:mt-5">
                    <p className="font-light text-sm md:text-base leading-relaxed text-gray-300">
                        FilmSpot® is an online platform dedicated to film enthusiasts and lovers of the seventh art. 
                        On this site you can find everything you need to enjoy the world of film. It offers you the 
                        latest movie descriptions, trailers, reviews and many other information about your favorite movies.
                    </p>
                    
                    <div className="mt-3 flex items-center flex-wrap gap-2">
                        <span className="text-sm text-gray-400">Powered by</span>
                        <img 
                            className="w-16 md:w-20 inline-block" 
                            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" 
                            alt="TMDB Logo"
                            loading="lazy"
                        />
                    </div>
                </div>
            
                {/* Social Media Section */}
                <div className="followUs mt-6 md:mt-7 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0">
                    <h2 className="font-medium text-base md:text-lg">Follow us on</h2>
                    
                    <div className="socials sm:ml-5 flex items-center gap-3 md:gap-4">
                        <Link 
                            className="button p-2 rounded-full hover:bg-[var(--textAccentColor)] hover:bg-opacity-20 transition-all duration-300 group" 
                            to="https://www.instagram.com/"
                            aria-label="Follow us on Instagram"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform">
                                <path d="M22.994 8.77765C22.0006 8.7796 21.1929 7.97525 21.1909 6.98185C21.189 5.98845 21.9933 5.18071 22.9872 5.17877C23.9811 5.17683 24.7888 5.98164 24.7907 6.97505C24.7922 7.96845 23.9879 8.77571 22.994 8.77765Z" fill="white"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M15.0143 22.7013C10.7614 22.7095 7.30638 19.2686 7.29813 15.0146C7.28985 10.7615 10.7317 7.30602 14.9847 7.29775C19.2387 7.28949 22.6941 10.7324 22.7024 14.9849C22.7107 19.239 19.2678 22.693 15.0143 22.7013ZM14.99 10.0004C12.2296 10.0053 9.99493 12.2482 9.99979 15.0092C10.0051 17.7707 12.2485 20.0049 15.009 19.9996C17.7705 19.9942 20.0051 17.7518 19.9997 14.9903C19.9944 12.2288 17.751 9.9951 14.99 10.0004Z" fill="white"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M5.149 0.808099C6.10158 0.434845 7.19167 0.179203 8.78769 0.103873C10.3876 0.0270908 10.8984 0.00958878 14.9711 0.00181578C19.0448 -0.00595722 19.5555 0.00958577 21.1554 0.0805418C22.752 0.149554 23.8426 0.401311 24.7971 0.77068C25.7846 1.15122 26.6225 1.66348 27.4574 2.49503C28.2924 3.32756 28.8066 4.16253 29.192 5.14863C29.5647 6.10218 29.8204 7.19132 29.8962 8.78834C29.972 10.3878 29.9905 10.8981 29.9982 14.9713C30.006 19.0441 29.9895 19.5553 29.9195 21.1563C29.85 22.7518 29.5988 23.8429 29.2294 24.7969C28.8479 25.7845 28.3366 26.6224 27.505 27.4573C26.6735 28.2928 25.8376 28.8065 24.8515 29.1924C23.8979 29.5647 22.8088 29.8203 21.2128 29.8966C19.6129 29.9724 19.1021 29.9904 15.028 29.9982C10.9557 30.006 10.445 29.9904 8.84506 29.9199C7.24853 29.85 6.15746 29.5987 5.20344 29.2298C4.21589 28.8478 3.37803 28.337 2.54307 27.505C1.70764 26.6729 1.19298 25.8375 0.808073 24.8514C0.434822 23.8983 0.180134 22.8087 0.103841 21.2131C0.0275448 19.6127 0.00956883 19.1014 0.00179883 15.0287C-0.00600117 10.9554 0.0100458 10.4451 0.0800208 8.84519C0.1505 7.24819 0.400796 6.15758 0.770162 5.20257C1.15166 4.21549 1.66293 3.3781 2.49546 2.54266C3.327 1.70771 4.16291 1.19252 5.149 0.808099ZM6.17692 26.7099C6.70617 26.9135 7.50028 27.1565 8.96268 27.2202C10.5451 27.2887 11.0189 27.3038 15.0231 27.296C19.0287 27.2887 19.5026 27.2717 21.0845 27.1973C22.5454 27.1278 23.3395 26.8819 23.8673 26.6758C24.5677 26.4022 25.0663 26.0751 25.5902 25.5507C26.1141 25.0244 26.4383 24.5243 26.7095 23.8239C26.9136 23.2942 27.1561 22.4996 27.2198 21.0372C27.2893 19.4557 27.3038 18.9814 27.2961 14.9762C27.2888 10.972 27.2718 10.4976 27.1965 8.91567C27.1274 7.45424 26.882 6.6601 26.6754 6.13279C26.4018 5.43149 26.0757 4.93382 25.5499 4.40941C25.024 3.88501 24.5239 3.56181 23.8226 3.29062C23.2943 3.08602 22.4992 2.84398 21.0378 2.78032C19.4554 2.71082 18.9811 2.69671 14.976 2.7045C10.9718 2.71227 10.4979 2.72831 8.91601 2.80316C7.45412 2.87265 6.66096 3.11808 6.13218 3.32465C5.43234 3.59826 4.93371 3.9234 4.40932 4.44975C3.88588 4.97609 3.56172 5.47522 3.29055 6.17702C3.08741 6.7058 2.84293 7.5009 2.78025 8.96233C2.71122 10.5448 2.69666 11.0191 2.70443 15.0233C2.71173 19.0285 2.72873 19.5029 2.80309 21.0838C2.87162 22.5462 3.11898 23.3394 3.32457 23.8687C3.59818 24.568 3.9243 25.0667 4.44966 25.5911C4.97601 26.1135 5.4761 26.4387 6.17692 26.7099Z" fill="white"/>
                            </svg>
                        </Link>

                        <Link 
                            className="button p-2 rounded-full hover:bg-[var(--textAccentColor)] hover:bg-opacity-20 transition-all duration-300 group" 
                            to="https://www.facebook.com/"
                            aria-label="Follow us on Facebook"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform">
                                <g clipPath="url(#clip0_93_255)">
                                    <path d="M15 0C23.2842 0 30 6.71574 30 15C30 22.669 24.2444 28.993 16.8173 29.8901V19.5837L20.8751 19.5837L21.7168 15H16.8173V13.3789C16.8173 12.1677 17.0548 11.3292 17.5998 10.7935C18.1449 10.2578 18.9973 10.0249 20.2271 10.0249C20.5384 10.0249 20.8249 10.028 21.0791 10.0342C21.4488 10.0432 21.7502 10.0588 21.96 10.0808V5.9256C21.8762 5.9023 21.7772 5.87901 21.6663 5.85608C21.4151 5.80413 21.1028 5.75405 20.767 5.71008C20.0654 5.61817 19.2616 5.55288 18.6992 5.55288C16.428 5.55288 14.7115 6.03878 13.5134 7.04524C12.0674 8.25989 11.3764 10.2328 11.3764 13.0248V15H8.28323V19.5837H11.3764V29.5583C4.8429 27.9373 0 22.0347 0 15C0 6.71574 6.71574 0 15 0Z" fill="white"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_93_255">
                                        <rect width="30" height="30" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </Link>

                        <Link 
                            className="button p-2 rounded-full hover:bg-[var(--textAccentColor)] hover:bg-opacity-20 transition-all duration-300 group" 
                            to="https://www.tiktok.com/"
                            aria-label="Follow us on TikTok"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform">
                                <path d="M21.3407 0H16.2848V20.4347C16.2848 22.8696 14.3402 24.8696 11.9203 24.8696C9.50042 24.8696 7.55586 22.8696 7.55586 20.4347C7.55586 18.0435 9.45721 16.0869 11.7907 16V10.8696C6.6484 10.9565 2.5 15.1739 2.5 20.4347C2.5 25.7392 6.73482 30 11.9636 30C17.1922 30 21.427 25.6957 21.427 20.4347V9.9565C23.3284 11.3478 25.6619 12.1739 28.125 12.2174V7.08696C24.3223 6.95652 21.3407 3.82608 21.3407 0Z" fill="white"/>
                            </svg>
                        </Link>

                        <Link 
                            className="button p-2 rounded-full hover:bg-[var(--textAccentColor)] hover:bg-opacity-20 transition-all duration-300 group" 
                            to="https://www.youtube.com/"
                            aria-label="Follow us on YouTube"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform">
                                <g clipPath="url(#clip0_93_251)">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M28.4332 6.0427C28.8986 6.51116 29.2329 7.09365 29.4025 7.73188C30.0298 10.0876 30.0298 15.0001 30.0298 15.0001C30.0298 15.0001 30.0298 19.9126 29.4025 22.2682C29.2329 22.9065 28.8986 23.489 28.4332 23.9574C27.9677 24.4259 27.3874 24.7639 26.7502 24.9376C24.4048 25.5682 15.0298 25.5682 15.0298 25.5682C15.0298 25.5682 5.65479 25.5682 3.30933 24.9376C2.6722 24.7639 2.09186 24.4259 1.62639 23.9574C1.16093 23.489 0.826667 22.9065 0.657058 22.2682C0.0297852 19.9126 0.0297852 15.0001 0.0297852 15.0001C0.0297852 15.0001 0.0297852 10.0876 0.657058 7.73188C0.826667 7.09365 1.16093 6.51116 1.62639 6.0427C2.09186 5.57425 2.6722 5.23626 3.30933 5.06257C5.65479 4.43188 15.0298 4.43188 15.0298 4.43188C15.0298 4.43188 24.4048 4.43188 26.7502 5.06257C27.3874 5.23626 27.9677 5.57425 28.4332 6.0427ZM19.8025 15.0001L11.9616 10.5393V19.4609L19.8025 15.0001Z" fill="white"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_93_251">
                                        <rect width="30" height="30" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
            
            {/* Copyright Section */}
            <div className="w-full p-3 md:p-4 text-center text-white font-light bg-[#11151C]">
                <p className="text-xs md:text-sm">
                    Copyright © 2025 | <span className="!text-[var(--textAccentColor)] font-medium">Film</span>Spot | All Rights Reserved
                </p>
            </div>
        </footer>
    );
}

export default memo(Footer);