import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TrendItem = ({ trend }) => {
  return (
    <Card className="trend-item" sx={{ boxShadow: 3, borderRadius: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={trend.image}
        alt={trend.title}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {trend.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
            {trend.organization}
            <CheckCircleIcon sx={{ fontSize: 16, color: 'blue', ml: 0.5 }} />
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LinearProgress
            variant="determinate"
            value={parseFloat(trend.percentage)}
            sx={{ flexGrow: 1, height: 10, borderRadius: 5, mr: 1 }}
          />
          <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold', color: 'green' }}>
            {trend.percentage}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Target: {trend.target}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TrendItem;
