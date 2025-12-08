import { Button } from './components/Button';
import { Card } from './components/Card';
import { Container } from './components/Container';
import { Image } from './components/Image';
import { Text } from './components/Text';
import { Input } from './components/Input';
import { Badge } from './components/Badge';
import { List } from './components/List';
import { ProgressBar } from './components/ProgressBar';
import { Divider } from './components/Divider';

export const COMPONENT_REGISTRY: Record<string, React.FC<any>> = {
    button: Button,
    card: Card,
    container: Container,
    image: Image,
    text: Text,
    input: Input,
    badge: Badge,
    list: List,
    progressbar: ProgressBar,
    divider: Divider,
};
