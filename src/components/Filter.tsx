import FilterListIcon from '@mui/icons-material/FilterList';
import { useEffect, useState, useContext } from 'react';
import Router from 'next/router';
import { UserContext } from '@/components/Layout';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import styles from '@/styles/components/Filter.module.css';
import Menu from '@mui/material/Menu';

const Filter = () => {
	const [opened, setOpened] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const openMenu = (event: React.MouseEvent<HTMLElement>): void => {
		setAnchorEl(event.currentTarget);
	};

	const closeMenu = (): void => {
		setAnchorEl(null);
	};

	return (
		<UserContext.Consumer>
			{({ darkTheme }) => (
				<div style={{ position: 'relative' }}>
          <div onClick={openMenu}>
            <FilterListIcon sx={{ color: 'gray', fontSize: '30px', cursor: 'pointer' }} />
          </div>
					<Menu
						anchorEl={anchorEl}
						id="account-menu"
						open={open}
						onClose={closeMenu}
						PaperProps={{
							elevation: 0,
							sx: {
								overflow: 'visible',
								filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
								mt: 1.5,
								'& .MuiAvatar-root': {
									width: 32,
									height: 32,
									ml: -0.5,
									mr: 1
								},
								'&:before': {
									content: '""',
									display: 'block',
									position: 'absolute',
									top: 0,
									right: 14,
									width: 10,
									height: 10,
									bgcolor: darkTheme ? 'rgb(29, 29, 29)' : 'background.paper',
									transform: 'translateY(-50%) rotate(45deg)',
									zIndex: 0
								},
								bgcolor: darkTheme ? 'rgb(29, 29, 29)' : '',
								color: darkTheme ? 'lightgrey' : '',
								width: '250px',
								borderRadius: '20px',
                padding: '10px 20px'
							}
						}}
						transformOrigin={{ horizontal: 'right', vertical: 'top' }}
						anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
					>
						<RadioGroup defaultValue="female">
							<FormControlLabel value="female" control={<Radio />} label="Recents" />
							<FormControlLabel value="male" control={<Radio />} label="Alphabetical (A-Z)" />
							<FormControlLabel value="other" control={<Radio />} label="Z-A" />
						</RadioGroup>
					</Menu>
				</div>
			)}
		</UserContext.Consumer>
	);
};

export default Filter;
