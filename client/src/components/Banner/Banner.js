import React, { useState } from 'react';
import styled from "styled-components";
import bannerUtil from '../../utils/bannerUtil';
import { TiMediaStopOutline } from 'react-icons/ti';
import { BsDot } from 'react-icons/bs';
import './Banner.css';

const StyledBanner = styled.div`
	width: 100%;
	overflow: hidden;
	height: 95vh;
	background-color: green;
	position: relative;
	// z-index: -10;
	.dot-images {
		position: relative;
		z-index: 10;
		left: 20px;
		cursor: pointer;
		font-size: 3.5rem;
		font-weight: 700;
	}
	img {
		width: 100%;
		max-height: 100%;
		min-height: 100%;
		display: block;
		object-fit: fill;
		position: absolute;
		// z-index: -5;
	}
	.wrapper-banner {
		position: absolute;
		top: 150px;
		display: flex;
		justify-content: space-between;
		width: 95%;
		// background: red;
		margin: 0 20px;
	}
	.banner-info {
		height: 20rem;
		// background: green;
		color: white;
		width: 45%;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
	}
	.banner-info h1 {
		font-size: 2.5rem;
		font-weight: 700;
	}
	.banner-info h3 {
		font-size: 1.5rem;
	}
	.banner-info input {
		border: 0.1rem solid #808080;
    border-radius: 0.5rem;
    cursor: pointer;
		padding: 0.3rem;
	}
	.banner-invisible {
		background: blue;
	}
`

const StyledButton = styled.button`
	padding: 0.3rem;
	border: 0.1rem solid #808080;
	border-radius: 0.5rem;
	cursor: pointer;
	background-color: #A78139;
	font-size: 1.6rem;
	color: white;
	width: 8rem;
	&:hover {
		border: 0.2rem solid #404040;
		background-color: red;
	}
`

function Banner() {
	const [current, setCurrent] = useState(0);
	console.log(bannerUtil)
	const length = bannerUtil.length;

	const nextSlide = () => {
		setCurrent(current === bannerUtil.length -1 ? 0 : current + 1)
	}

	const prevSlide = () => {
		setCurrent(current === 0 ? bannerUtil.length -1 : current - 1)
	}

	const getImg = (index) => {
		setCurrent(index)
	}
	return (
		<>

		<StyledBanner className="banner-wrapper">
			{
				bannerUtil.map((ban, i) => 

					<>
						{
						current === i &&
						<React.Fragment key={i}>
							
								
							<img src={`images/${ban.src}`} alt={`${ban.alt}`} />
							<div style={ { flexDirection: i === 3 && 'row-reverse' }} className='wrapper-banner'>
								<div className="banner-info">
									<h1>{`${ban.h1}`} <strong>{ban.discount}</strong></h1>
									<h3>{`${ban.h3}`}</h3>
									<StyledButton onClick={prevSlide}>Shop</StyledButton>
								</div>
								<div className="banner-invisible">
									
								</div>
							</div>
							
						</React.Fragment>
				}	
					</>
				)
			}
			{
				Array(length).fill('dots').map((h, i) => <BsDot key={i + ' a'} onClick={() => getImg(i)} color={`${current === i ? 'gold' : ' white'}`} className='dot-images' />)
				// <BsDot className='dot-image'/>

				// <TiMediaStopOutline className='dot-image' fill='red'/>
			}
		</StyledBanner>



		
		<div className='curve-container'>
			{/* <div className="curve-top"> */}
			<svg 
				className='curve-top' 
				xmlns="http://www.w3.org/2000/svg" 
				viewBox="0 0 1440 320">
					<path 
						fill="#fff" 
						fillOpacity="1" 
						d="M0,96L80,117.3C160,139,320,181,480,176C640,171,800,117,960,96C1120,75,1280,85,1360,90.7L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z">
					</path>
			</svg>
				
			{/* </div> */}
			<div className='banner-content'>
			
			<div className='banner-words'>
				{/* <div className='banner-word'> */}
					<h3>30% OFF</h3>
					<h1>because we care</h1>
				{/* </div> */}
				{/* <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse molestias iure provident, 
					tenetur laudantium error earum eum assumenda aliquid exercitationem nemo. 
					Itaque nulla molestias nostrum exercitationem nam. Modi, repudiandae itaque?
					
				</h3> */}



			</div>
			<div className='banner-image'>
				<img src='images/dmitrii-vaccinium-ByUAo3RpA6c-unsplash.jpg' alt='somepic'/>				
			</div>
			</div>

			{/* <div > */}

			<svg className='curve-bottom'
				xmlns="http://www.w3.org/2000/svg" 
				viewBox="0 0 1440 320">
					<path 
						fill="#fff" 
						fillOpacity="1" 
						d="M0,96L80,117.3C160,139,320,181,480,176C640,171,800,117,960,96C1120,75,1280,85,1360,90.7L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z">
					</path>
			</svg>
			{/* </div> */}
		</div>
		</>
	)
}

export default Banner;