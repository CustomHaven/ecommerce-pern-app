import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai';
import { FiUserCheck, FiUserX } from 'react-icons/fi';
import { BsBasket3 } from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import './Header.css';

function Header() {
	// TODO some logic to display FiUserCheck if logged in to view dashboard then remove FiUserX

	// Consider using maybe Chakra or MUI and as well take all the CSS into a css file or use styled-components
	return (
		<header>
			<div>
				<p>LOGO</p>
			</div>
			<nav>
				<ul>
					<li>
						About Us
					</li>
					<li>
						Shop
					</li>
					<li>
						Track Your Order
					</li>
					<li>
						<div>
							<div>
								<BiSearchAlt />
							</div>
							<div>
								<AiOutlineHeart />
							</div>
							<div>
								<FiUserX />
							</div>
							<div>
								<BsBasket3 />
							</div>
						</div>
					</li>		
				</ul>
			</nav>
		</header>
	)
}

export default Header
