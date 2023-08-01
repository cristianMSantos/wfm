import * as React from 'react';
import { Box } from "@mui/system";
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export function RelatoriosGuideSearch() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ maxWidth: 1000 }}>
        <CardActionArea>
          <Box style={{ display: 'flex' }}>
            <CardMedia
              component="img"
              height="200"
              image="/static/plansul-texture.jpeg"
              alt="relatorios guia"
              sx={{ flex: 1 }}
            />
            <CardContent style={{ flex: 1 }}> {/* Ajuste de tamanho do conteúdo de texto para ocupar 2/3 do espaço */}
              <Typography gutterBottom variant="h5" component="div">
                Como usar
              </Typography>
              <Typography variant="body2" color="text.secondary">
                A tabela será gerada quando o campo de mês e ano forem
                preenchidos e ao clicar no botão 'PESQUISAR'.
              </Typography>
            </CardContent>
          </Box>
        </CardActionArea>
      </Card>
    </Box>
  );
}