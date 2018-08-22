import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import withRoot from "../HoC/withRoot";

const styles = theme => ({
  layout: {
    width: "auto",
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  card: {
    display: "flex",
    alignItems: "center"
    // height: 80
  },
  cardDetails: {
    flex: 1
  },
  paperTitle: {
    marginBottom: 20,
    padding: theme.spacing.unit
  },
  paper: {
    display: "flex",
    height: 200,
    background: "linear-gradient(60deg, #26c6da, #00acc1)"
  },
  paperOrange: {
    display: "flex",
    height: 200,
    background: "linear-gradient(60deg, #ffa726, #fb8c00)"
  },
  paperRed: {
    display: "flex",
    height: 200,
    background: "linear-gradient(60deg, #ef5350, #e53935)"
  },
  avatar: {
    backgroundColor: green[500],
    marginRight: 20
  },
  avatarGrey: {
    backgroundColor: grey[500],
    marginRight: 20
  }
});

const featuredPosts = [
  {
    title: "Envío Costos de Combustibles"
  },
  {
    title: "Envío disponibilidad de Combustibles"
  },
  {
    title: "Publicación PLP"
  }
];

const data = [
  { name: "ene-18", p: 72 },
  { name: "feb-18", p: 88 },
  { name: "mar-18", p: 90 },
  { name: "abr-18", p: 62 },
  { name: "may-18", p: 87 },
  { name: "jun-18", p: 94 }
];

class Index extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.layout}>
          <Grid container spacing={40} className={classes.cardGrid}>
            {featuredPosts.map(post => (
              <React.Fragment key={post.title}>
                <Grid item xs={12} md={12}>
                  <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                      <CardContent>
                        <Typography variant="title">{post.title}</Typography>
                      </CardContent>
                    </div>
                    <Avatar className={classes.avatar} />
                    <Avatar className={classes.avatarGrey} />
                    <Avatar className={classes.avatarGrey} />
                  </Card>
                </Grid>
                {/* <Grid item xs={12} md={4}>
                  <Paper elevation={1} className={classes.paper}>
                  <Typography variant="title">Factor de Cumplimiento</Typography>
                  </Paper>
                  </Grid> */}
                <Grid item xs={12} md={4}>
                  <Paper elevation={1} className={classes.paperTitle}>
                    <Typography variant="body1">
                      Factor de Cumplimiento
                    </Typography>
                  </Paper>
                  <Paper elevation={1} className={classes.paper}>
                    <ResponsiveContainer height="100%" width="100%">
                      <BarChart
                        data={data}
                        margin={{ top: 20, right: 20, left: -5, bottom: 5 }}
                      >
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                          dataKey="name"
                          minTickGap={1}
                          tick={{
                            fontSize: 12,
                            fontFamily: "Roboto",
                            stroke: "white",
                            fontWeight: 100
                          }}
                        />
                        <YAxis
                          tick={{
                            fontFamily: "Roboto",
                            stroke: "white",
                            fontWeight: 100
                          }}
                        />
                        <Bar dataKey="p" fill="#FFFFFF" barSize={25} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper elevation={1} className={classes.paperTitle}>
                    <Typography variant="body1">
                      % Publicación a Tiempo
                    </Typography>
                  </Paper>
                  <Paper elevation={1} className={classes.paperOrange}>
                    <ResponsiveContainer height="100%" width="100%">
                      <BarChart
                        data={data}
                        margin={{ top: 20, right: 20, left: -5, bottom: 5 }}
                      >
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                          dataKey="name"
                          minTickGap={1}
                          tick={{
                            fontSize: 12,
                            fontFamily: "Roboto",
                            stroke: "white",
                            fontWeight: 100
                          }}
                        />
                        <YAxis
                          tick={{
                            fontFamily: "Roboto",
                            stroke: "white",
                            fontWeight: 100
                          }}
                        />
                        <Bar dataKey="p" fill="#FFFFFF" barSize={25} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper elevation={1} className={classes.paperTitle}>
                    <Typography variant="body1">Tiempos Promedios</Typography>
                  </Paper>
                  <Paper elevation={1} className={classes.paperRed}>
                    <ResponsiveContainer height="100%" width="100%">
                      <BarChart
                        data={data}
                        margin={{ top: 20, right: 20, left: -5, bottom: 5 }}
                      >
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                          dataKey="name"
                          minTickGap={1}
                          tick={{
                            fontSize: 12,
                            fontFamily: "Roboto",
                            stroke: "white",
                            fontWeight: 100
                          }}
                        />
                        <YAxis
                          tick={{
                            fontFamily: "Roboto",
                            stroke: "white",
                            fontWeight: 100
                          }}
                        />
                        <Bar dataKey="p" fill="#FFFFFF" barSize={25} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Paper>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(Index));
