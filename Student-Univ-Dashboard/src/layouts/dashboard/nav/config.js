// component
import HomeIcon from '@mui/icons-material/Home';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_user'),
  },
  {
    title: 'maisons',
    path: '/dashboard/maisons',
    icon: icon('ic_home'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },

  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
